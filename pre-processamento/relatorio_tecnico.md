# Relatório Técnico: Pré-processamento e Organização das Imagens

## 1. Introdução e Escolha do Dataset
Para o desenvolvimento do protótipo do Assistente Cardiológico Virtual, foi selecionado o dataset público **Chest X-Ray Images (Pneumonia)**, disponibilizado no Kaggle. Este conjunto de dados contém imagens de raio-X do tórax divididas em duas classes principais: `NORMAL` (pacientes saudáveis) e `PNEUMONIA` (pacientes diagnosticados com pneumonia).

A escolha desse dataset baseia-se na sua relevância clínica e na clareza dos padrões visuais, o que o torna ideal para a aplicação de redes neurais convolucionais (CNNs) no diagnóstico por imagem.

## 2. Análise Exploratória e Desbalanceamento das Classes
Durante a coleta e unificação inicial das imagens, foi possível constatar uma assimetria significativa na distribuição das classes, caracterizando o dataset como **altamente desbalanceado**.
A distribuição original encontrada foi a seguinte:
- **NORMAL**: 1.583 imagens
- **PNEUMONIA**: 4.273 imagens

O desbalanceamento (com a classe de pneumonia sendo majoritária) é comum em datasets médicos do "mundo real". Essa característica exigiu atenção na etapa de modelagem, motivando o uso de métricas como *Precision*, *Recall*, *F1-Score* e *Matriz de Confusão* para a correta avaliação do modelo, visto que olhar apenas para a acurácia poderia gerar conclusões enganosas (o modelo poderia, por exemplo, prever sempre "pneumonia" e ainda assim obter alta acurácia). Além disso, técnicas de *Data Augmentation* (aumento de dados) foram aplicadas posteriormente no conjunto de treinamento para suavizar esse viés e melhorar a capacidade de generalização do modelo.

## 3. Etapas de Pré-processamento Aplicadas

As imagens originais encontram-se em diferentes resoluções e precisaram passar por um *pipeline* de padronização antes de serem fornecidas à CNN. Foram aplicadas as seguintes técnicas:

### 3.1. Leitura e Conversão de Formato (RGB)
As imagens foram carregadas usando a biblioteca OpenCV (`cv2.imread`). Em seguida, foram convertidas do padrão padrão BGR do OpenCV para o formato padrão **RGB** (`cv2.cvtColor`). Isso garante a compatibilidade das imagens com as redes neurais pré-treinadas (como a ResNet50 e a VGG16) e bibliotecas de visualização gráfica.

### 3.2. Redimensionamento (*Resizing*)
A arquitetura de redes neurais profundas, especialmente as arquiteturas adotadas em *Transfer Learning* (ex: ResNet50 e VGG16), exige imagens em um tamanho de entrada específico e uniforme. Sendo assim, todas as imagens foram redimensionadas para as dimensões de **224x224 pixels**. Essa resolução padronizada balanceia a riqueza de detalhes e a eficiência computacional necessária para o treinamento em recursos limitados.

### 3.3. Normalização
Na etapa de geração dos dados em lotes (usando o `ImageDataGenerator` do TensorFlow), foi aplicado o *rescaling* com o fator **1.0 / 255**. Isso normaliza o valor numérico dos pixels de uma escala de 0 a 255 para o intervalo de **0 a 1**. A normalização é fundamental em redes neurais para garantir maior estabilidade numérica, convergência mais rápida da rede e mitigar problemas de exploração do gradiente, permitindo que a CNN extraia características de maneira eficaz.

## 4. Divisão do Conjunto de Dados (*Split*)
O formato original em que o dataset do Kaggle é fornecido não possuía uma divisão de validação bem distribuída. Por este motivo, as imagens de todas as subpastas (`train`, `val` e `test`) foram unificadas temporariamente e, logo em seguida, **re-divididas** de forma consolidada e estatisticamente robusta usando a biblioteca `scikit-learn` (`train_test_split`). 

A distribuição final escolhida seguiu a proporção:
- **Treino (70%)**: Conjunto principal onde a CNN ajustará seus pesos, contemplando dados suficientes para a convergência.
- **Validação (15%)**: Usado durante as épocas de treinamento para monitorar o desempenho e aplicar técnicas de parada antecipada (*Early Stopping*), evitando sobreajuste (*overfitting*).
- **Teste (15%)**: Conjunto reservado e inédito, não acessível à rede durante o treino ou validação, utilizado para validar o desempenho final do protótipo no mundo real e gerar as métricas de eficácia.

## 5. Conclusão
O *pipeline* de pré-processamento estruturou as imagens em conformidade plena com os requisitos ideais para a ingestão e treinamento de modelos baseados em Visão Computacional. O mapeamento do desbalanceamento da classe orientará o rigor da avaliação e do acompanhamento das métricas na próxima fase, conferindo assim, alta confiabilidade e responsabilidade na elaboração de um Assistente Cardiológico Virtual seguro.
