# Relatório Técnico: Pipeline de Visão Computacional para Análise de Raio-X de Tórax

## 1. Escolha do Dataset

### 1.1. Descrição do Conjunto de Dados
O dataset utilizado para este projeto é composto por imagens de Raio-X de tórax (Chest X-Ray), organizado nas pastas tradicionais e dividido por classes (por exemplo, `NORMAL` e possivelmente `PNEUMONIA`). 

### 1.2. Justificativa da Escolha
A principal justificativa para a adoção deste conjunto de dados — conforme premissa do projeto — é **por ser um dataset de tamanho reduzido (pequeno)**. As vantagens associadas a essa escolha incluem:
* **Rapidez na Iteração:** Um volume menor de dados permite prototipagem rápida, testes ágeis de arquiteturas e redução do tempo de treinamento de modelos.
* **Acessibilidade Computacional:** Pode ser facilmente manipulado, carregado em memória e treinado sem a necessidade de infraestruturas robustas de hardware (como múltiplos nós de GPU).
* **Prova de Conceito (PoC):** Ideal para o desenvolvimento inicial e validação da pipeline de visão computacional na prática clínica antes do escalonamento para bases de dados maiores.

---

## 2. Pipeline de Preparação e Pré-processamento

A pipeline de pré-processamento estabelecida no `preprocessing.ipynb` aplica transformações padrão de Visão Computacional necessárias para a entrada em Redes Neurais Convolucionais (CNNs).

### 2.1. Etapas do Pré-processamento e Justificativas Técnicas

1. **Leitura e Conversão de Cores (OpenCV):**
   * **Processo:** As imagens são lidas do disco utilizando `cv2.imread()` e posteriormente convertidas com `cv2.cvtColor(img, cv2.COLOR_BGR2RGB)`.
   * **Justificativa:** O OpenCV, por padrão, lê as imagens no formato BGR (Blue-Green-Red). A maioria dos frameworks de deep learning (como PyTorch e TensorFlow/Keras) e bibliotecas de visualização (como Matplotlib) esperam o formato RGB. Essa conversão garante que os canais de cores sejam interpretados corretamente.

2. **Redimensionamento (Resizing - 224x224):**
   * **Processo:** As imagens são redimensionadas para as dimensões exatas de `(224, 224)` pixels.
   * **Justificativa:** A dimensão 224x224 é um padrão na indústria (estabelecido pela arquitetura VGG e mantido pelo ResNet, MobileNet, entre outros) e é o formato esperado caso decida-se aplicar *Transfer Learning* com modelos pré-treinados no ImageNet. Além disso, a padronização resolve o problema de variação nas dimensões originais dos raios-X, já que os algoritmos de deep learning geralmente exigem que os tensores de entrada tenham tamanho fixo.

3. **Normalização (Scaling):**
   * **Processo:** As imagens, cujos valores de pixel variam originalmente de 0 a 255, são divididas por 255.0 (`img_resized / 255.0`), escalando-as para o intervalo `[0, 1]`.
   * **Justificativa:** Normalizar os dados é crucial para a estabilidade e velocidade do treinamento de redes neurais. Manter os valores numa escala pequena impede gradientes muito grandes ou instáveis (vanishing/exploding gradients) e ajuda otimizadores (como Adam e SGD) a convergirem mais rápido para o mínimo global.

---

## 3. Estratégia de Divisão dos Dados

### 3.1. Estrutura de Diretórios e Particionamento
Com base nos imports (`train_test_split`) e na estrutura observada (`dataset/archive/chest_xray/train/NORMAL`), a estratégia de particionamento utiliza a técnica de particionamento por diretórios combinada com a aleatorização por código.

* **Divisão de Pastas (Base):** O dataset já provê partições físicas nativas, observadas na pasta `train` (comumente acompanhada de pastas como `test` e/ou `val`). Essa divisão estática permite manter consistência (benchmarking fixo) durante a avaliação.
* **Uso do `train_test_split` (scikit-learn):** A importação dessa ferramenta sugere uma intenção de redividir dinamicamente partes do dataset. 

### 3.2. Justificativa Técnica da Divisão
* **Prevenção de Data Leakage:** Manter os subconjuntos de Treino, Validação e Teste rigorosamente separados garante que o modelo não observe nenhuma informação de teste durante a fase de aprendizagem. 
* **Treino:** Usado para ajuste de pesos e retropropagação.
* **Validação (via train_test_split):** Utilizado durante o treinamento para monitorar *overfitting* e realizar o ajuste fino dos hiperparâmetros (como *learning rate* ou número de épocas) de forma imparcial.
* **Teste:** Mantido inalterado e oculto até o momento da avaliação final para aferir a capacidade real de generalização da máquina em dados da clínica que nunca foram vistos antes.
