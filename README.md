# FIAP - Faculdade de Informática e Administração Paulista

<p align="center">
<a href= "https://www.fiap.com.br/"><img src="assets/logo-fiap.png" alt="FIAP - Faculdade de Informática e Admnistração Paulista" border="0" width=40% height=40%></a>
</p>

<br>

# Assistente Cardiológico Virtual

## Grupo - Visão Computacional na Clínica

## 👨‍🎓 Integrantes: 
- <a href="https://github.com/Vitor985-hub">Vitor Eiji</a>
- <a href="https://github.com/BPilecarte">Beatriz Pilecarte</a>
- <a href="https://github.com/yggdrasilGit">Francismar Alves</a>
- <a href="https://github.com/matheusbento04">Matheus Soares</a>
- <a href="https://github.com/AntonioBarros19">Antonio Barros</a>

## 👩‍🏫 Professores:
### Tutor(a) 
- <a href="https://www.linkedin.com/in/caique-nonato/">Caique Nonato</a>
### Coordenador(a)
- <a href="https://www.linkedin.com/in/andregodoichiovato/">André Godoi Chiochiovatto</a>


## 📜 Descrição

O projeto consiste na construção de um protótipo de **Assistente Cardiológico Virtual**, utilizando técnicas avançadas de Visão Computacional na área da saúde. O objetivo principal é automatizar o pré-processamento de imagens médicas e treinar modelos de Redes Neurais Convolucionais (CNNs) para classificar e identificar padrões patológicos em exames, garantindo eficiência, confiabilidade e responsabilidade no uso de dados médicos.

Para este protótipo, selecionamos o dataset público **Chest X-Ray Images (Pneumonia)**, disponível no Kaggle. A escolha deste dataset justifica-se por ser uma base de dados mais enxuta, leve e significativamente mais fácil de ser trabalhada em ambientes com recursos computacionais e tempo limitados. É importante destacar que o dataset reflete desafios de cenários clínicos reais, sendo **altamente desbalanceado** (contendo majoritariamente imagens da classe "Pneumonia" em detrimento da "Normal"). Esse desbalanceamento exigiu a adoção de métricas de avaliação rigorosas (como F1-Score, Precisão e Recall) e a utilização de técnicas de *Data Augmentation* para evitar viés na rede.

Em relação à arquitetura de modelagem, justificamos a opção por utilizar o *framework* **PyTorch** devido à sua excelência, flexibilidade e forte compatibilidade com as **GPUs da NVIDIA** via CUDA. Essa integração e otimização nativas aceleram drasticamente o treinamento das CNNs (tanto a rede construída do zero quanto os modelos baseados em *Transfer Learning*), maximizando a eficiência e garantindo agilidade no fluxo de testes e validação da equipe.


## 📁 Estrutura de pastas

Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

- <b>classificacao_de_imagens</b>: Contém o notebook de modelagem (`image_classification_with_cnn.ipynb`), onde foram implementadas as abordagens de treinamento da CNN do zero e Transfer Learning (ResNet50), além dos pesos salvos do modelo.
- <b>dataset</b>: Diretório reservado para armazenar as imagens originais baixadas do Kaggle. **Atenção**: o dataset original não é versionado no repositório devido ao seu tamanho.
- <b>pre-processamento</b>: Pasta destinada à etapa de preparação de dados. Inclui o script de pré-processamento (`preprocessing.ipynb`), rotinas de redivisão das pastas, além do relatório técnico justificando as etapas e abordando o desbalanceamento das classes.
- <b>requirements.txt</b>: Lista de dependências e bibliotecas Python necessárias para rodar o projeto.
- <b>README.md</b>: Arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

## 🔧 Como executar o código

### Pré-requisitos
- **Python 3.10+** instalado em sua máquina.
- Ambiente virtual configurado (recomendado o uso do diretório local `.venv`).
- Placa de vídeo NVIDIA (opcional, mas altamente recomendado) com os *drivers* do CUDA atualizados, para usufruir da aceleração via hardware proporcionada pelo PyTorch.

### Instalação e Preparação do Dataset
1. Clone este repositório para sua máquina local:
   ```bash
   git clone https://github.com/Vitor985-hub/Cap-1---Visao-Computacional-na-Clinica.git
   ```
2. Navegue até o diretório raiz do projeto:
   ```bash
   cd Cap-1---Visao-Computacional-na-Clinica
   ```
3. Ative seu ambiente virtual (ex: `source .venv/bin/activate` ou `.venv\Scripts\activate`) e instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
 *(Nota: Certifique-se de que a versão instalada do PyTorch e Torchvision em sua máquina é a correspondente à sua versão do CUDA, acessando o [site oficial do PyTorch](https://pytorch.org/).)*

4. **Download do Dataset (Obrigatório)**:
   Para que os notebooks funcionem, você deve popular a pasta `dataset`:
   - Acesse a página do dataset no Kaggle: [Chest X-Ray Images (Pneumonia)](https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia)
   - Realize o download e extraia o conteúdo (`archive.zip`).
   - Coloque as pastas extraídas dentro da pasta `dataset` na raiz deste projeto, garantindo que a estrutura fique `dataset/archive/chest_xray/train`, etc.

### Execução em Fases
- **Fase 1 (Pré-processamento)**:
  Acesse a pasta `pre-processamento` e execute o notebook `preprocessing.ipynb`. Este arquivo efetuará a carga das imagens da pasta de *datasets*, aplicará o redimensionamento (224x224), a normalização (rescale de pixels) e irá redividir os dados balanceadamente para Treino, Validação e Teste (salvando as saídas no diretório `dataset_processado`).
- **Fase 2 (Classificação)**:
  Com as imagens organizadas, vá até a subpasta `classificacao_de_imagens` e execute o notebook `image_classification_with_cnn.ipynb` de maneira sequencial. Neste notebook, a CNN do zero e as abordagens de *Transfer Learning* (como a ResNet) serão treinadas com o auxílio do framework configurado, e as matrizes de confusão e métricas de desempenho serão geradas como protótipo interativo nas próprias células.


## 🗃 Histórico de lançamentos

* 0.1.0 - 04/06/2026
    * Lançamento do protótipo base do projeto contemplando a Fase 1 (Pré-processamento) e a Fase 2 (Treinamento das CNNs e Modelos PyTorch).

## 📋 Licença

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/agodoi/template">MODELO GIT FIAP</a> por <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://fiap.com.br">Fiap</a> está licenciado sobre <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>
