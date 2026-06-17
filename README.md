# FIAP - Faculdade de Informática e Administração Paulista

<p align="center">
<a href="https://www.fiap.com.br/">
    <img src="assets/logo-fiap.png"
         alt="FIAP - Faculdade de Informática e Administração Paulista"
         border="0"
         width="40%">
</a>
</p>

<br>

# Assistente Cardiológico Virtual

## Grupo - Visão Computacional na Clínica

## 👨‍🎓 Integrantes

- [Vitor Eiji](https://github.com/Vitor985-hub)
- [Beatriz Pilecarte](https://github.com/BPilecarte)
- [Francismar Alves](https://github.com/yggdrasilGit)
- [Matheus Soares](https://github.com/matheusbento04)
- [Antonio Barros](https://github.com/AntonioBarros19)

## 👩‍🏫 Professores

### Tutor(a)

- [Caique Nonato](https://www.linkedin.com/in/caique-nonato/)

### Coordenador(a)

- [André Godoi Chiochiovatto](https://www.linkedin.com/in/andregodoichiovato/)

---

## 📜 Descrição

O projeto consiste na construção de um protótipo de **Assistente Cardiológico Virtual**, utilizando técnicas avançadas de Visão Computacional aplicadas à área da saúde.

O objetivo principal é automatizar o pré-processamento de imagens médicas e treinar modelos de Redes Neurais Convolucionais (CNNs) capazes de classificar e identificar padrões patológicos em exames, garantindo eficiência, confiabilidade e responsabilidade no uso de dados médicos.

Para este protótipo foi utilizado o dataset público **Chest X-Ray Images (Pneumonia)**, disponível no Kaggle. A escolha deste conjunto de dados ocorreu por se tratar de uma base relativamente enxuta, permitindo treinamento e validação mesmo em ambientes com recursos computacionais limitados.

O dataset representa desafios reais encontrados em aplicações clínicas, principalmente devido ao forte desbalanceamento entre as classes. A maior parte das imagens pertence à categoria **Pneumonia**, enquanto a classe **Normal** possui quantidade significativamente menor de exemplos.

Para lidar com esse cenário, foram utilizadas:

- Técnicas de Data Augmentation;
- Métricas robustas de avaliação;
- Precision;
- Recall;
- F1-Score.

A modelagem foi desenvolvida utilizando o framework **PyTorch**, escolhido por sua flexibilidade e excelente integração com GPUs NVIDIA por meio do CUDA, permitindo acelerar significativamente o treinamento dos modelos.

Foram avaliadas duas abordagens:

1. CNN construída do zero;
2. Transfer Learning utilizando ResNet50.

Os resultados demonstraram que a estratégia baseada em Transfer Learning apresentou melhor desempenho geral, sendo adotada como modelo final do sistema.

---

## 🎥 Vídeo Demonstrativo

Assista à demonstração completa do aplicativo em funcionamento:

[![Assista ao vídeo](assets/thumb-video.png)](https://youtu.be/OJVD0r-TtBU)

Ou acesse diretamente:

👉 LINK_DO_VIDEO

O vídeo apresenta:

- Pré-processamento das imagens médicas;
- Classificação utilizando ResNet50 com Transfer Learning;
- Consumo da API Flask;
- Aplicativo React Native realizando o envio de imagens;
- Retorno do diagnóstico em tempo real.

---

## 🏗 Arquitetura da Solução

```text
Mobile App (React Native)
            │
            ▼
      API Flask
            │
            ▼
Modelo ResNet50 Fine-Tuned
            │
            ▼
Predição:
Normal ou Pneumonia
```

---

## 📁 Estrutura de Pastas

Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

- **backend**: API REST desenvolvida em Flask que expõe o endpoint `/predict` para classificar imagens de raio-X utilizando o modelo de Transfer Learning baseado em ResNet50 (`best_resnet_finetuned.pth`).
- **classificacao_de_imagens**: Contém o notebook de modelagem (`image_classification_with_cnn.ipynb`), onde foram implementadas as abordagens de treinamento da CNN do zero e Transfer Learning (ResNet50), além dos pesos salvos do modelo.
- **dataset**: Diretório reservado para armazenar as imagens originais baixadas do Kaggle. **Atenção:** o dataset original não é versionado no repositório devido ao seu tamanho.
- **mobile_app**: Aplicativo móvel híbrido construído em React Native que se integra com a API Flask, oferecendo uma interface interativa para carregar e diagnosticar imagens médicas.
- **pre-processamento**: Pasta destinada à etapa de preparação de dados. Inclui o script de pré-processamento (`preprocessing.ipynb`), rotinas de redivisão das pastas e o relatório técnico justificando as etapas e abordando o desbalanceamento das classes.
- **requirements.txt**: Lista de dependências e bibliotecas Python necessárias para rodar o projeto.
- **README.md**: Arquivo que serve como guia e explicação geral sobre o projeto.

---

## 🔧 Como Executar o Projeto

### Pré-requisitos

- Python 3.10+ instalado.
- Ambiente virtual configurado (recomendado `.venv`).
- GPU NVIDIA com CUDA (opcional, porém recomendado).
- Node.js versão LTS.
- Git instalado.

---

### 1️⃣ Clonando o Repositório

```bash
git clone https://github.com/Vitor985-hub/Cap-1---Visao-Computacional-na-Clinica.git
```

```bash
cd Cap-1---Visao-Computacional-na-Clinica
```

---

### 2️⃣ Instalação das Dependências

Ative seu ambiente virtual:

#### Windows

```bash
.venv\Scripts\activate
```

#### Linux/macOS

```bash
source .venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

> Certifique-se de instalar a versão correta do PyTorch compatível com sua versão do CUDA. Consulte: https://pytorch.org/

---

### 3️⃣ Download do Dataset

Acesse:

https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia

Baixe e extraia o conteúdo.

Organize a estrutura:

```text
dataset/
└── archive/
    └── chest_xray/
        ├── train/
        ├── test/
        └── val/
```

---

## 🚀 Execução em Fases

### Fase 1 — Pré-processamento

Acesse:

```text
pre-processamento/
```

Execute:

```text
preprocessing.ipynb
```

O notebook realiza:

- Redimensionamento para 224x224;
- Normalização;
- Reorganização dos conjuntos;
- Balanceamento dos dados;
- Geração do diretório `dataset_processado`.

---

### Fase 2 — Treinamento e Avaliação

Acesse:

```text
classificacao_de_imagens/
```

Execute:

```text
image_classification_with_cnn.ipynb
```

O notebook:

- Treina uma CNN do zero;
- Treina uma ResNet50 via Transfer Learning;
- Avalia os modelos;
- Salva os pesos do melhor modelo.

---

### Fase 3 — Backend Flask

Execute:

```bash
python backend/app.py
```

A API será iniciada em:

```text
http://localhost:5000
```

Endpoint disponível:

```text
POST /predict
```

---

### Fase 4 — Aplicação Mobile

Acesse:

```bash
cd mobile_app
```

Instale as dependências:

```bash
npm install
```

Configure a URL da API no arquivo `App.js`:

```javascript
const API_URL = "http://SEU_IP_LOCAL:5000";
```

Inicie o Metro:

```bash
npm start
```

Em outro terminal:

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

> Para iOS é necessário macOS e executar previamente `pod install`.

---

## 🚀 Tecnologias Utilizadas

### Inteligência Artificial

- PyTorch
- Torchvision
- Scikit-Learn
- NumPy
- Pandas

### Processamento de Imagens

- OpenCV
- Pillow

### Backend

- Flask
- Flask-CORS

### Mobile

- React Native
- Axios

### Ferramentas

- Git
- GitHub
- Jupyter Notebook
- CUDA (opcional)

---

## 📊 Métricas de Avaliação

Devido ao desbalanceamento das classes, foram utilizadas métricas além da acurácia:

- Accuracy
- Precision
- Recall
- F1-Score
- Matriz de Confusão

Essas métricas fornecem uma visão mais confiável da capacidade do modelo em identificar corretamente casos de Pneumonia e casos Normais.

---

## 🗃 Histórico de Lançamentos

### 0.2.0 — 16/06/2026

- Integração completa entre IA, API Flask e aplicativo React Native.
- Inferência em tempo real via dispositivo móvel.
- Melhorias na arquitetura do projeto.

### 0.1.0 — 04/06/2026

- Implementação inicial do pipeline de pré-processamento.
- Treinamento dos primeiros modelos CNN.
- Estruturação do projeto acadêmico.

---

## 📌 Próximas Melhorias

- Deploy da API em ambiente cloud.
- Dashboard web para acompanhamento de diagnósticos.
- Inclusão de Grad-CAM para explicabilidade dos resultados.
- Suporte a múltiplas patologias pulmonares.
- Pipeline automatizado de treinamento.

---

## 📋 Licença

[MODELO GIT FIAP](https://github.com/agodoi/template) por [Fiap](https://fiap.com.br) está licenciado sobre [Attribution 4.0 International](http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1).
