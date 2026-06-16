# FIAP - Faculdade de InformÃ¡tica e AdministraÃ§Ã£o Paulista

<p align="center">
<a href= "https://www.fiap.com.br/"><img src="assets/logo-fiap.png" alt="FIAP - Faculdade de InformÃ¡tica e AdmnistraÃ§Ã£o Paulista" border="0" width=40% height=40%></a>
</p>

<br>

# Assistente CardiolÃ³gico Virtual

## Grupo - VisÃ£o Computacional na ClÃ­nica

## ðŸ‘¨â€�ðŸŽ“ Integrantes: 
- <a href="https://github.com/Vitor985-hub">Vitor Eiji</a>
- <a href="https://github.com/BPilecarte">Beatriz Pilecarte</a>
- <a href="https://github.com/yggdrasilGit">Francismar Alves</a>
- <a href="https://github.com/matheusbento04">Matheus Soares</a>
- <a href="https://github.com/AntonioBarros19">Antonio Barros</a>

## ðŸ‘©â€�ðŸ�« Professores:
### Tutor(a) 
- <a href="https://www.linkedin.com/in/caique-nonato/">Caique Nonato</a>
### Coordenador(a)
- <a href="https://www.linkedin.com/in/andregodoichiovato/">AndrÃ© Godoi Chiochiovatto</a>


## ðŸ“œ DescriÃ§Ã£o

O projeto consiste na construÃ§Ã£o de um protÃ³tipo de **Assistente CardiolÃ³gico Virtual**, utilizando tÃ©cnicas avanÃ§adas de VisÃ£o Computacional na Ã¡rea da saÃºde. O objetivo principal Ã© automatizar o prÃ©-processamento de imagens mÃ©dicas e treinar modelos de Redes Neurais Convolucionais (CNNs) para classificar e identificar padrÃµes patolÃ³gicos em exames, garantindo eficiÃªncia, confiabilidade e responsabilidade no uso de dados mÃ©dicos.

Para este protÃ³tipo, selecionamos o dataset pÃºblico **Chest X-Ray Images (Pneumonia)**, disponÃ­vel no Kaggle. A escolha deste dataset justifica-se por ser uma base de dados mais enxuta, leve e significativamente mais fÃ¡cil de ser trabalhada em ambientes com recursos computacionais e tempo limitados. Ã‰ importante destacar que o dataset reflete desafios de cenÃ¡rios clÃ­nicos reais, sendo **altamente desbalanceado** (contendo majoritariamente imagens da classe "Pneumonia" em detrimento da "Normal"). Esse desbalanceamento exigiu a adoÃ§Ã£o de mÃ©tricas de avaliaÃ§Ã£o rigorosas (como F1-Score, PrecisÃ£o e Recall) e a utilizaÃ§Ã£o de tÃ©cnicas de *Data Augmentation* para evitar viÃ©s na rede.

Em relaÃ§Ã£o Ã  arquitetura de modelagem, justificamos a opÃ§Ã£o por utilizar o *framework* **PyTorch** devido Ã  sua excelÃªncia, flexibilidade e forte compatibilidade com as **GPUs da NVIDIA** via CUDA. Essa integraÃ§Ã£o e otimizaÃ§Ã£o nativas aceleram drasticamente o treinamento das CNNs (tanto a rede construÃ­da do zero quanto os modelos baseados em *Transfer Learning*), maximizando a eficiÃ## 📁 Estrutura de pastas

Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

- <b>backend</b>: API REST desenvolvida em Flask que expõe o endpoint `/predict` para classificar imagens de raio-X utilizando o modelo de Transfer Learning baseado em ResNet50 (`best_resnet_finetuned.pth`).
- <b>classificacao_de_imagens</b>: Contém o notebook de modelagem (`image_classification_with_cnn.ipynb`), onde foram implementadas as abordagens de treinamento da CNN do zero e Transfer Learning (ResNet50), além dos pesos salvos do modelo.
- <b>dataset</b>: Diretório reservado para armazenar as imagens originais baixadas do Kaggle. **Atenção**: o dataset original não é versionado no repositório devido ao seu tamanho.
- <b>mobile_app</b>: Aplicativo móvel híbrido construído em React Native que se integra com a API Flask, oferecendo uma interface interativa para carregar e diagnosticar imagens médicas.
- <b>pre-processamento</b>: Pasta destinada à etapa de preparação de dados. Inclui o script de pré-processamento (`preprocessing.ipynb`), rotinas de redivisão das pastas, além do relatório técnico justificando as etapas e abordando o desbalanceamento das classes.
- <b>requirements.txt</b>: Lista de dependências e bibliotecas Python necessárias para rodar o projeto.
- <b>README.md</b>: Arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).


## ðŸ”§ Como executar o cÃ³digo

### PrÃ©-requisitos
- **Python 3.10+** instalado em sua mÃ¡quina.
- Ambiente virtual configurado (recomendado o uso do diretÃ³rio local `.venv`).
- Placa de vÃ­deo NVIDIA (opcional, mas altamente recomendado) com os *drivers* do CUDA atualizados, para usufruir da aceitaÃ§Ã£o via hardware proporcionada pelo PyTorch.
- **Node.js** (versÃ£o LTS) instalado para executar o aplicativo mÃ³vel.

### InstalaÃ§Ã£o e PreparaÃ§Ã£o do Dataset
1. Clone este repositÃ³rio para sua mÃ¡quina local:
   ```bash
   git clone https://github.com/Vitor985-hub/Cap-1---Visao-Computacional-na-Clinica.git
   ```
2. Navegue atÃ© o diretÃ³rio raiz do projeto:
   ```bash
   cd Cap-1---Visao-Computacional-na-Clinica
   ```
3. Ative seu ambiente virtual (ex: `source .venv/bin/activate` ou `.venv\Scripts\activate`) e instale as dependÃªncias:
   ```bash
   pip install -r requirements.txt
   ```
 *(Nota: Certifique-se de que a versÃ£o instalada do PyTorch e Torchvision em sua mÃ¡quina Ã© a correspondente Ã  sua versÃ£o do CUDA, acessando o [site oficial do PyTorch](https://pytorch.org/).)*

4. **Download do Dataset (ObrigatÃ³rio)**:
   Para que os notebooks funcionem, vocÃª deve popular a pasta `dataset`:
   - Acesse a pÃ¡gina do dataset no Kaggle: [Chest X-Ray Images (Pneumonia)](https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia)
   - Realize o download e extraia o conteÃºdo (`archive.zip`).
   - Coloque as pastas extraÃ­das dentro da pasta `dataset` na raiz deste projeto, garantindo que a estrutura fique `dataset/archive/chest_xray/train`, etc.

### Execução em Fases
- **Fase 1 (Pré-processamento)**:
  Acesse a pasta `pre-processamento` e execute o notebook `preprocessing.ipynb`. Este arquivo efetuará a carga das imagens da pasta de *datasets*, aplicará o redimensionamento (224x224), a normalização (rescale de pixels) e irá redividir os dados balanceadamente para Treino, Validação e Teste (salvando as saídas no diretório `dataset_processado`).
- **Fase 2 (Classificação e Treinamento)**:
  Com as imagens organizadas, vá até a subpasta `classificacao_de_imagens` e execute o notebook `image_classification_with_cnn.ipynb` de maneira sequencial para treinar e avaliar o modelo ResNet50.
- **Fase 3 (Servindo o Modelo via Backend Flask)**:
  1. No diretório raiz do projeto, certifique-se de que seu ambiente virtual esteja ativado (ex: `.venv\Scripts\Activate.ps1` no Windows ou `source .venv/bin/activate` no Linux/macOS) e que todas as dependências estejam devidamente instaladas:
     ```bash
     pip install -r requirements.txt
     ```
  2. Inicialize o servidor Flask para rodar a API de classificação:
     ```bash
     python backend/app.py
     ```
     O servidor iniciarÃ¡ localmente no endereÃ§o `http://localhost:5000` (ou usando o IP de sua mÃ¡quina local na rede).
- **Fase 4 (AplicaÃ§Ã£o Mobile)**:
  Com o backend rodando, vocÃª pode executar o aplicativo React Native:
  1. Navegue atÃ© a pasta `mobile_app`:
     ```bash
     cd mobile_app
     ```
  2. Instale as dependÃªncias javascript:
     ```bash
     npm install
     ```
  3. No arquivo `App.js`, configure a variÃ¡vel `API_URL` com o endereÃ§o IP de sua mÃ¡quina na rede local:
     ```javascript
     const API_URL = 'http://<seu-ip-local>:5000';
     ```
  4. Inicie o servidor de empacotamento Metro:
     ```bash
     npm start
     ```
  5. Em outro terminal, execute o aplicativo no emulador ou dispositivo fÃ­sico:
     - **Android**: `npm run android`
     - **iOS**: `npm run ios` (requer ambiente macOS e a execuÃ§Ã£o prÃ©via do comando `pod install` na pasta `ios`).

## 🗃 Histórico de lançamentos

* 0.2.0 - 16/06/2026
    * Integração de ponta a ponta com o desenvolvimento da API backend (Flask) e do cliente móvel (React Native) para diagnósticos de imagem em tempo real.
* 0.1.0 - 04/06/2026
    * Lançamento do protótipo base do projeto contemplando a Fase 1 (Pré-processamento) e a Fase 2 (Treinamento das CNNs e Modelos PyTorch).

## ðŸ“‹ LicenÃ§a

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/agodoi/template">MODELO GIT FIAP</a> por <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://fiap.com.br">Fiap</a> estÃ¡ licenciado sobre <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>
