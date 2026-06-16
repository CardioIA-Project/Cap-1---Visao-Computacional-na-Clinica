import io
import os
from pathlib import Path
from flask import Flask, jsonify, request
from flask_cors import CORS # Permite que a API seja acessada de diferentes origens (CORS)
from PIL import Image # Biblioteca para manipulação de imagens
import torch 
from torchvision import models, transforms

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "classificacao_de_imagens" / "best_resnet_finetuned.pth"

CLASS_NAMES = ["NORMAL", "PNEUMONIA"]
IMG_SIZE = 224

# Função para carregar o modelo pré-treinado e adaptado para a classificação de imagens
def load_model(model_path: Path):
    if not model_path.exists():
        raise FileNotFoundError(f"Modelo não encontrado em: {model_path}")

    # Carrega o modelo pré-treinado e adapta a última camada para o número de classes
    model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)
    num_ftrs = model.fc.in_features
    model.fc = torch.nn.Sequential(
        torch.nn.Dropout(0.4),
        torch.nn.Linear(num_ftrs, len(CLASS_NAMES))
    )

    # Verifica se CUDA está disponível e carrega o modelo no dispositivo apropriado
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()
    return model, device


# Carrega o modelo e o dispositivo (CPU ou GPU)
MODEL, DEVICE = load_model(MODEL_PATH)

# Pré-processa a imagem antes de passar para o modelo
TRANSFORM = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])


# Função para pré-processar a imagem antes de passar para o modelo
def preprocess_image(image_bytes: bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return TRANSFORM(image).unsqueeze(0)


# Endpoint para verificar se a API está funcionando
@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "ok", "message": "Flask image classifier API is running"})


# Endpoint para previsão de classe a partir de uma imagem enviada via POST
@app.route("/predict", methods=["POST"])
def predict():

    print(f"Request files: {request.files}")
    print(f"Request form: {request.form}")
    print(f"Request data keys: {request.data}")
    
    if "image" not in request.files:
        return jsonify({"error": f"Nenhuma imagem enviada. Use o campo 'image'. Campos recebidos: {list(request.files.keys())}"}), 400

    image_file = request.files["image"]
    if image_file.filename == "":
        return jsonify({"error": "Arquivo de imagem inválido."}), 400

    image_bytes = image_file.read()
    try:
        image_tensor = preprocess_image(image_bytes).to(DEVICE)
    except Exception as error:
        return jsonify({"error": f"Falha ao processar a imagem: {str(error)}"}), 400

    with torch.no_grad():
        outputs = MODEL(image_tensor)
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
        score, predicted_idx = torch.max(probabilities, dim=0)

    result = {
        "prediction": CLASS_NAMES[predicted_idx.item()],
        "confidence": float(score.item()),
        "scores": {CLASS_NAMES[i]: float(probabilities[i].item()) for i in range(len(CLASS_NAMES))}
    }

    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
