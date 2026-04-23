import React, { useState, useRef } from 'react';
import { Calendar, Clock, CheckCircle, Image as ImageIcon, Type, MapPin, Upload, Download, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// --- DADOS DO PLANEJAMENTO ---
const PLAN_DATA = [

  {
    id: 1,
    title: 'Abril',
    posts: [
      {
        id: 1,
        type: 'FEED',
        headline: 'Como agendar seu exame na Clínica B+ em 3 passos simples.',
        art: 'Arte gráfica em formato de passo a passo (infográfico clean, sofisticado e de fácil leitura). A paleta de cores deve usar os tons institucionais da clínica.\n• Título: Agende seu exame de forma rápida e prática.\n• Passo 1: Adicione nosso WhatsApp: 3721-1116 OU clique no link da bio.\n• Passo 2: Fale com nossa recepção a sua necessidade.\n• Passo 3: Nossa equipe ajudará a escolher o melhor dia e horário.',
        legenda: 'Sabemos que a sua rotina é corrida e que, na gestação ou no cuidado com a saúde, praticidade é fundamental. Por isso, agendar sua consulta ou exame na Clínica B+ é muito fácil e sem complicação! 📲✨\n\nBasta seguir o passo a passo:\n1️⃣ Adicione nosso WhatsApp: 3721-1116 OU clique diretamente no link da nossa bio.\n2️⃣ Fale com nossa recepção a sua necessidade (qual exame ou consulta deseja realizar).\n3️⃣ Nossa equipe de atendimento ajudará a escolher o melhor dia e horário para você.\n\nNossa equipe está pronta para tirar suas dúvidas, explicar nossos protocolos completos e garantir que sua experiência seja acolhedora desde a primeira mensagem. Esperamos por você! 🤍'
      },
      {
        id: 2,
        type: 'FEED',
        headline: 'SEXTA-FEIRA SANTA\nTempo de reflexão, silêncio e fé.',
        art: 'Imagem focada na cruz ou no calvário, com uma iluminação dramática e respeitosa (tons mais escuros, luz de fim de tarde ou silhueta). O design deve ser solene, transmitindo o peso e a importância religiosa da data, com a tipografia clássica e o logotipo da clínica de forma discreta.',
        legenda: 'Hoje é um dia de silêncio, reflexão e fé. A Sexta-feira Santa nos convida a olhar para a cruz, a agradecer pelo dom da vida e pelo amor que se sacrifica e se renova. Para todas as famílias, desejamos um dia de paz, oração e união. Que a luz desta data abençoe o seu lar. 🙏✨'
      },
      {
        id: 3,
        type: 'FEED',
        headline: 'FELIZ PÁSCOA\nO verdadeiro significado da renovação.',
        art: 'Imagem focada no tema da ressurreição de Cristo (como o sepulcro vazio, uma cruz iluminada pelo sol da manhã, ou elementos de luz que remetam à ressurreição). A paleta de cores deve ser clara e iluminada, transmitindo esperança, vitória e paz.',
        legenda: 'A Páscoa é a celebração da vida que vence, do amor que renasce e da esperança que se renova. Que a luz do Cristo Ressuscitado traga bênçãos, saúde e muita paz para a sua família e para a vida que está crescendo dentro de você. Uma Feliz e Abençoada Páscoa de toda a equipe da Clínica B+! 🕊️🤍'
      },
      {
        id: 4,
        type: 'FEED',
        headline: 'Onde o cuidado e a excelência se encontram.',
        art: 'Foto bonita e bem iluminada da fachada da Clínica B+ ou da recepção principal. Ícone de "pin" de localização elegante (estilo mapa). Texto de apoio com o endereço na própria arte: Av. Rui Barbosa, 321 - Divinópolis, Caruaru - PE.',
        legenda: 'Você já conhece o nosso espaço? A Clínica B+ foi projetada para oferecer o máximo de conforto, segurança e tecnologia para você e sua família. Desde a recepção acolhedora até as nossas salas de exames equipadas com aparelhos de ponta, tudo foi pensado para transformar a sua experiência e diminuir a ansiedade.\n\n📍 Estamos localizados na Av. Rui Barbosa, 321 - Divinópolis, Caruaru - PE, 55010-540.\n\nVenha nos fazer uma visita ou agende seu exame pelo WhatsApp 3721-1116. Esperamos por você! 🏢✨'
      },
      {
        id: 5,
        type: 'FEED',
        headline: 'O cuidado com a sua saúde em todas as fases da vida.',
        art: 'Foto de uma mulher (25-38 anos) sorridente e confiante, em um ambiente leve. Ícone ou texto sutil indicando "Ginecologia e Exames da Mulher".',
        legenda: 'A Clínica B+ é referência em ultrassonografia obstétrica, mas o nosso cuidado com você vai muito além da gestação. Oferecemos atendimento completo em Ginecologia e exames de rotina (como ultrassom transvaginal, pélvica e de mamas) com o mesmo rigor técnico e equipamentos de alta precisão. A prevenção é o maior ato de amor com o seu próprio corpo. Cuidar de quem gera a vida é cuidar de você, em todas as fases. 🌸 Agende seu check-up anual conosco.'
      },
      {
        id: 6,
        type: 'FEED',
        headline: 'Morfológica do 1º Trimestre: muito além de uma imagem.',
        art: 'Arte clean dividida (ou mesclada): de um lado, a foto de um médico da Clínica B+ analisando um exame com extrema concentração; do outro, tópicos curtos e elegantes destacando "Rastreamento minucioso" e "Protocolos completos".',
        legenda: 'Entre a 11ª e a 14ª semana, você passará por um dos exames mais importantes da gestação. A Morfológica do 1º Trimestre não é apenas para "ver o bebê", mas sim um rastreamento minucioso de síndromes genéticas e avaliação da anatomia inicial. Na Clínica B+, nossos especialistas seguem protocolos rigorosos para garantir que nenhum detalhe passe despercebido. Aqui, não existem "adicionais ocultos": o exame é completo porque a sua segurança não se negocia. 🩺✨'
      },
      {
        id: 7,
        type: 'FEED',
        headline: 'O cuidado com o seu maior amor continua aqui.',
        art: 'Foto de um pediatra sorrindo enquanto examina um bebê no colo da mãe. Ambiente claro, transmitindo segurança, afeto e profissionalismo.',
        legenda: 'Nós acompanhamos cada batida do coração do seu bebê durante a gestação, e queremos continuar ao lado da sua família após o nascimento! A Clínica B+ conta com a especialidade de Pediatria, oferecendo um acompanhamento humanizado, focado no desenvolvimento saudável e no acolhimento que os pais (especialmente os de primeira viagem) tanto precisam. Da barriga para a vida, a nossa equipe está com você. 🧸🤍 Agende a consulta do seu pequeno pelo link da bio.'
      },
      {
        id: 8,
        type: 'FEED',
        headline: 'Imagem e Laboratório no mesmo lugar: praticidade para você.',
        art: 'Composição visual mostrando uma profissional de coleta de laboratório com todo o cuidado, e ao lado um ícone de ultrassom. Texto de apoio: "Seu check-up completo na Clínica B+".',
        legenda: 'Sabemos que o seu tempo é valioso. Por isso, na Clínica B+ você encontra Exames de Imagem e Exames Laboratoriais em um só lugar. Seja para os exames de sangue do pré-natal, testes genéticos ou o seu check-up de rotina, oferecemos a mesma qualidade, segurança e agilidade nos resultados. Menos deslocamento, mais conforto e a confiança de ter toda a sua saúde cuidada pela nossa equipe. 🩸🔬 Fale com nosso atendimento e agende seus exames.'
      },
      {
        id: 9,
        type: 'FEED',
        headline: 'Doppler Obstétrico: a lupa para a saúde do seu bebê.',
        art: 'Foto focada no equipamento de ultrassom moderno da clínica, mostrando a tela com o mapeamento a cores (Doppler) e as mãos do médico operando o aparelho com precisão.',
        legenda: 'Você sabe para que serve o Doppler Obstétrico? 🩸 Ele é a nossa principal ferramenta para avaliar o fluxo de sangue entre você, a placenta e o bebê. É através dele que garantimos que seu filho está recebendo todo o oxigênio e nutrientes necessários para crescer forte e saudável. Um exame fundamental para a redução de riscos e para uma gestação segura. Na B+, tecnologia de ponta e especialização médica andam juntas para entregar o melhor diagnóstico.'
      },
      {
        id: 10,
        type: 'FEED',
        headline: 'Combo da Mulher: O cuidado completo que você merece.',
        art: 'Seguir a identidade visual da clínica (tons de verde e azul). Layout limpo e direto, listando os itens do combo com ícones de "+": Consulta com Ginecologista, Citologia (Papanicolau), Colposcopia, Ultrassom Endovaginal. Foto de uma mulher sorridente e confiante ao lado.',
        legenda: 'A prevenção é o maior ato de amor com o seu próprio corpo. 🌸 Pensando na sua saúde integral, a Clínica B+ preparou o Combo da Mulher, um check-up completo para você realizar seus exames de rotina com praticidade, segurança e a excelência de sempre.\n\nO combo inclui:\n✅ Consulta com Ginecologista\n✅ Citologia (Papanicolau)\n✅ Colposcopia\n✅ Ultrassom Endovaginal\n\nTudo em um só lugar, com equipamentos de ponta e profissionais especializados. Cuide de você! Agende seu Combo da Mulher pelo WhatsApp 3721-1116 ou clique no link da bio.'
      },
      {
        id: 11,
        type: 'FEED',
        headline: '21 de Abril - Dia de Tiradentes',
        art: 'Arte comemorativa do Dia de Tiradentes. Fundo com as cores da clínica (azul e verde) em um gradiente suave, com a frase "21 de Abril - Dia de Tiradentes" em destaque. Elementos sutis que remetam à data e a logomarca da Clínica B+.',
        legenda: 'Hoje celebramos o Dia de Tiradentes, um marco na nossa história que nos inspira a valorizar a liberdade e a coragem. A Clínica B+ deseja a todos um excelente feriado, com muita saúde, paz e descanso ao lado de quem você ama! 🇧🇷✨ #DiaDeTiradentes #Feriado #ClinicaBmais #Saude'
      },
      {
        id: 12,
        type: 'FEED',
        headline: 'A tranquilidade de saber que tudo está planejado.',
        art: 'Imagem de uma gestante relaxada, lendo um livro ou tomando um chá em um ambiente confortável. Inserção gráfica sofisticada apresentando os nomes: "Pacote Gestação Essencial" e "Pacote Gestação Completa".',
        legenda: 'O planejamento traz paz. E na gestação, paz é fundamental. 🤍 Criamos o Pacote Gestação Essencial e o Pacote Gestação Completa para que você tenha a garantia de realizar todos os ultrassons importantes no momento exato, com a mesma equipe de especialistas que já conhece a sua história. Sem preocupações mês a mês, apenas a continuidade de um cuidado de excelência e clareza em cada etapa. Envie uma mensagem para nossa equipe e entenda qual pacote faz mais sentido para o seu pré-natal.'
      }
    ]
  },
  {
    id: 5,
    title: 'Stories (Comunicados)',
    isStories: true,
    posts: [
      {
        id: 'c1',
        title: 'Feriado Sexta-feira Santa',
        closedDates: '(03/04 e 04/04)',
        openDate: '(SEG 06/04)',
        message: 'Bom feriado a todos!'
      },
      {
        id: 'c2',
        title: 'Feriado de Tiradentes',
        closedDates: '(21/04)',
        openDate: '(QUA 22/04)',
        message: 'Bom feriado a todos!'
      },
      {
        id: 'c3',
        title: 'Dia do Trabalhador',
        closedDates: '(01/05)',
        openDate: '(02/05)',
        message: 'Bom feriado a todos!'
      }
    ]
  },
  {
    id: 6,
    title: 'Maio',
    posts: [
      {
        id: 1,
        type: 'FEED',
        headline: 'FELIZ DIA DO TRABALHADOR\nO trabalho dignifica, mas a saúde é o que te sustenta.',
        art: 'Arte gráfica limpa e acolhedora homenageando os trabalhadores. Imagem de profissionais de diferentes áreas ou da equipe técnica da clínica trabalhando com um sorriso. Cores institucionais fortes e selo "1º de Maio".',
        legenda: 'Hoje é dia de homenagear a força, a dedicação e o suor de quem faz o mundo girar! 💼✨ O trabalho dignifica, realiza sonhos e constrói o futuro, mas lembre-se: o seu maior instrumento de trabalho é a sua saúde.\n\nNão deixe que a rotina agitada e os compromissos diários façam você esquecer de cuidar de si mesmo(a). A Clínica B+ deseja a todos um Feliz Dia do Trabalhador! Que a sua jornada seja sempre de sucesso e, principalmente, de muita saúde para aproveitar todas as conquistas do seu esforço. Parabéns pelo seu dia! 🛠️💙 #DiaDoTrabalhador #SaudeDoTrabalhador #ClinicaBMais'
      },
      {
        id: 2,
        type: 'FEED',
        headline: 'A verdadeira força de uma mãe nasce no autocuidado.',
        art: 'Foto de capa de revista: Uma mulher deslumbrante e real, exalando confiança e paz. Tom fotográfico quente e acolhedor (golden hour). Selo leve e dourado: "Mês das Mães B+".',
        legenda: 'Seja bem-vindo, Maio! O mês mais afetuoso do ano chegou. Historicamente, fomos ensinadas que ser mãe é sinônimo de doar-se por inteiro — e nós abraçamos isso com amor. Mas a Clínica B+ está aqui para te lembrar de um segredo: o seu filho precisa, acima de tudo, que você esteja BEM. Cuidar da sua saúde física e mental é o maior ato de amor pela sua família. Neste mês, nossa homenagem será cuidar de VOCÊ. Acompanhe nossos conteúdos exclusivos! 🌸✨ #MesDasMaes #ClinicaBMais #Caruaru'
      },
      {
        id: 3,
        type: 'FEED',
        headline: 'Emagrecimento guiado: Resgate sua autoestima com segurança.',
        art: 'Composição minimalista e moderna: Uma mesa médica elegante, um bloco de receituário da B+, estetoscópio e as embalagens sutis desfocadas (remetendo às canetas). Foco em "Saúde e Acompanhamento".',
        legenda: 'O corpo feminino passa por inúmeras transformações, principalmente após a maternidade. Recomeçar e buscar a melhor versão da sua saúde exige ciência e apoio médico. O tratamento com as "canetas emagrecedoras" (análogos de GLP-1) é uma revolução, mas só funciona com segurança através de um acompanhamento clínico e rigoroso.\n\nAqui na Clínica B+, você não caminha sozinha: monitoramos seus exames de perto, garantindo bem-estar, controle de efeitos adversos e resultados reais e duradouros. Pronta para investir em você de forma segura? 🩺💚 Fale no WhatsApp e agende sua avaliação médica!'
      },
      {
        id: 4,
        type: 'REELS',
        headline: 'O som mais emocionante do mundo. 🤍',
        art: 'Capa do Vídeo (Reels): Uma gestante segurando a mão do parceiro(a), ambos com lágrimas nos olhos olhando para a tela do ultrassom (fora de quadro). Texto na tela: "Momentos B+: Ouça com a gente".',
        legenda: 'Aquele "tum-tum" acelerado que muda a vida de uma família para sempre. 🥺 O primeiro batimento cardíaco fetal é um dos marcos mais inesquecíveis da jornada da gravidez. Na Clínica B+, nossos equipamentos de última geração não entregam apenas imagens em alta definição, eles traduzem emoção pura.\n\nE você, lembra qual foi a sensação de ouvir esse som pela primeira vez? Conta pra gente nos comentários! 👇🤰 #Ultrassom #MaternidadeReal #ClinicaBMais'
      },
      {
        id: 5,
        type: 'FEED',
        headline: 'Mãe, você já checou sua saúde este ano?',
        art: 'Infográfico luxuoso em formato de carrossel. Capa: "Check-list da Saúde da Mulher Moderna". Cards seguintes com exames (Colposcopia, Papa, USG Mamas e Transvaginal).',
        legenda: 'A agenda do pediatra do filho está em dia, as vacinas também, a rotina da casa administrada... e as SUAS consultas? 👀\n\nNeste mês de maio, a Clínica B+ reforça o ALERTA VERMELHO do autocuidado. O nosso "Combo da Mulher" foi desenhado para você resolver TUDO em um só dia: Consulta Ginecológica + Citologia + Colposcopia + USG Endovaginal.\n\nSem desculpas, sem perder dias inteiros em salas de espera diferentes. Você entra, resolve tudo com nossa equipe de excelência e sai tranquila. Priorize-se! 🩸✨'
      },
      {
        id: 6,
        type: 'FEED',
        headline: 'Feliz Dia das Mães: Onde tudo começa.',
        art: 'Arte cinematográfica: Mãe e bebê recém-nascido em um momento de pura conexão, aquele "olho no olho" (skin to skin). Logotipo da Clínica B+ em marca d’água elegante. Palavras: Amor, Força, Vida.',
        legenda: 'Mãe: um título, mil funções, infinito amor. Hoje reverenciamos quem tem o poder divino de gerar, nutrir e proteger a vida. Na Clínica B+, acompanhamos diariamente o nascer de novos laços, as lágrimas de felicidade no exame morfológico e a coragem de cada uma de vocês.\n\nÀs mães de primeira viagem, às mães de muitos, às mães de anjo e a todas que carregam o amor maternal: nosso reconhecimento e gratidão.\n\nFeliz Dia das Mães! ❤️🕊️ De toda a diretoria e equipe médica Clínica B+.'
      },
      {
        id: 7,
        type: 'FEED',
        headline: 'O cuidado com o seu filho não termina no parto.',
        art: 'Foto de um ambiente de pediatria iluminado e alegre, destacando uma criança brincando no chão enquanto o médico sorri conversando com a mãe.',
        legenda: 'Você acompanhou cada milímetro do desenvolvimento no ultrassom... e agora ele está no seu colo! 😍 A transição para a vida lúdica fora da barriga exige orientações precisas.\n\nA especialidade de Pediatria na Clínica B+ é muito mais do que medir e pesar. É sobre oferecer segurança aos pais, amparar na introdução alimentar, guiar as janelas de sono e garantir que o desenvolvimento neurológico e motor do seu filho atinja todo o potencial. Seu porto seguro continua sendo aqui na B+. 🧸🩺'
      },
      {
        id: 8,
        type: 'FEED',
        headline: 'Por que o Doppler Obstétrico é o queridinho dos médicos?',
        art: 'Foco no detalhe: Foco na máquina de ultrassom revelando os fluxos azuis e vermelhos (Doppler), com um box explicativo elegante: "A linguagem do coração e da placenta".',
        legenda: 'Se a ultrassonografia comum é a "foto", o Doppler é o "mapa da vida". 🩸✨\n\nÉ esse recurso mágico (e super tecnológico!) que permite ao médico ver como o sangue e, consequentemente, os nutrientes e o oxigênio estão fluindo da mamãe para o bebê. Ele salva vidas detectando precocemente sofrimento fetal ou alterações na pressão (como a pré-eclâmpsia).\n\nQuer tranquilidade absoluta no 3º trimestre? A Clínica B+ possui os setups mais avançados de Caruaru para um rastreamento via Doppler perfeito. 💙'
      },
      {
        id: 9,
        type: 'FEED',
        headline: 'CONHEÇA O B+ PASS',
        art: 'Layout informativo e direto da campanha. Destaque em tamanho grande para as artes reais do Cartão B+PASS (frente e verso). Ao lado, textos curtos em formato de tópicos listando as vantagens para o paciente (Consultas, Exames, Família).',
        legenda: 'O B+ PASS não é plano de saúde, é o seu passaporte para descontos exclusivos e atendimento de excelência na Clínica B+! 💳✨\n\nNós desenvolvemos o B+ PASS para quem deseja uma medicina humanizada, qualificada e ágil, com preços acessíveis e previsíveis. Com a sua adesão, você passa a ter acesso a:\n\n✅ Descontos super especiais em consultas médicas com nossos especialistas.\n✅ Condições reduzidas na nossa linha completa de exames de Imagem (Ultrassonografias) e Laboratoriais.\n✅ Possibilidade de inclusão de dependentes (traga quem você ama para cuidar da saúde também).\n✅ Zero burocracia e atendimento rápido.\n\nDescubra que o padrão de qualidade B+ cabe no seu bolso. Mande uma mensagem agora no nosso WhatsApp (3721-1116), tire suas dúvidas com a recepção e garanta os benefícios do seu cartão B+ PASS! 💙 #BPass #ClinicaBMais #DescubraOBPass #Caruaru'
      },
      {
        id: 10,
        type: 'FEED',
        headline: 'A excelência virou referência em Caruaru.',
        art: 'Fotografia premium da fachada da Clínica B+ em Divinópolis ao entardecer, com iluminação cênica. Destacando a magnitude e conforto da estrutura.',
        legenda: 'O ano é 2026 e o orgulho que temos do espaço construído para vocês só aumenta! 🏢 A Clínica B+ foi arquitetada para quebrar o padrão "frio" das clínicas médicas tradicionais.\n\nDa paleta de cores à escolha das poltronas, das recepções setorizadas à tecnologia das salas de diagnósticos. Cada metro quadrado aqui serve a um propósito: o de abraçar você.\n\n📍 Av. Rui Barbosa, 321 - Divinópolis. Venha vivenciar o Padrão B+ de Diagnóstico e Saúde.'
      },
      {
        id: 11,
        type: 'FEED',
        headline: 'Saúde Mental Materna: Como você está hoje?',
        art: 'Arte sensível, com cores pastel bem calmas. Uma caneca de chá e um bloco de notas escrito: "Sentir cansaço não diminui seu amor".',
        legenda: 'No mês de maio, precisamos ir além das flores e presentes. Precisamos falar do cansaço invisível. A carga mental feminina e materna é altíssima.\n\nLembre-se: pedir ajuda médica não é fraqueza. Ter alterações de humor pós-parto ou estresse diário intenso são reações químicas do seu próprio corpo pedindo um tempo e um zelo extra.\nNossa equipe médica está pronta para te ouvir sem julgamentos. Você não precisa dar conta de tudo o tempo todo. Fale conosco. 🤍🌸'
      },
      {
        id: 12,
        type: 'FEED',
        headline: 'Mito ou Verdade: A memória "some" na gravidez?',
        art: 'Design interativo, lúdico e atraente, estilo quiz ou carrossel de curiosidades. "Esquecendo tudo? Não é culpa sua!"',
        legenda: 'Você já abriu a geladeira de casa e pensou "o que eu vim fazer aqui mesmo?" 😅\n\nAcredite, é VERDADE (e tem até nome)! Essa famosa perda de memória ou dificuldade de concentração durante e logo após a gestação é conhecida mundialmente como "Mommy Brain" ou Placentésia.\n\nIsso ocorre devido às adaptações neurais no cérebro das grávidas geradas pelo volume de hormônios. O cérebro literalmente se "reconfigura" para focar quase que inteiramente na proteção do bebê! Incrível, né? Marca aquela mãe que está esquecendo até o próprio nome nos comentários! 👇🗣️'
      },
      {
        id: 13,
        type: 'FEED',
        headline: 'O fim de maio chegou, o amor-próprio fica.',
        art: 'Foto de uma paciente sorrindo fechando um cardápio/agenda na recepção da clínica, passando um clima de "dever cumprido" e paz interior.',
        legenda: 'O "Mês das Mães" está chegando ao fim, mas o seu amor-próprio não deve ter data de validade. 🌸💪\n\nO cuidado com você mesma é uma escolha diária, e nós somos seus parceiros nisso! Para ajudar você a colocar sua saúde sempre em primeiro lugar, o nosso Combo da Mulher está sempre à sua disposição.\n\nEm um único dia, num único local seguro e tecnológico, você realiza: Consulta Ginecológica + Citologia + Colposcopia + USG Endovaginal. Resolva tudo com agilidade e entre em junho priorizando o que importa: VOCÊ! Agende hoje mesmo pelo link da bio! ✅🏥'
      }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
    }
  };

  const currentWeek = PLAN_DATA.find(w => w.id === activeTab);

  const downloadPDF = async () => {
    setIsDownloading(true);
    
    try {
      // Small delay to ensure React has rendered the loading state
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1920, 1080] });
      const slides = document.querySelectorAll('.pdf-slide');
      
      if (!slides || slides.length === 0) {
        throw new Error("Nenhum slide encontrado para exportação.");
      }

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i] as HTMLElement;
        
        // html2canvas works best when we explicitly pass dimensions and scroll positions
        const canvas = await html2canvas(slide, {
          scale: 1,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          width: 1920,
          height: 1080,
          windowWidth: 1920,
          windowHeight: 1080,
          scrollY: 0,
          scrollX: 0
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        
        if (i > 0) {
          pdf.addPage([1920, 1080], 'landscape');
        }
        
        pdf.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);
      }
      
      pdf.save(`Planejamento_${currentWeek?.title.replace(/\s+/g, '_')}.pdf`);
    } catch (error: any) {
      console.error('Error generating PDF:', error);
      alert(`Ocorreu um erro ao gerar o PDF: ${error.message || 'Erro desconhecido'}. Tente novamente.`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] font-sans text-gray-800 pb-12 print:bg-white print:pb-0">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-8 py-5 flex flex-col md:flex-row justify-between items-center shadow-sm print:hidden">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          {/* Logo Upload Area */}
          <div 
            className="flex items-center cursor-pointer group relative"
            onClick={() => fileInputRef.current?.click()}
            title="Clique para alterar a logo"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleLogoUpload} 
            />
            {logoUrl ? (
              <img src={logoUrl} alt="Logo Clínica B+" className="h-14 object-contain" />
            ) : (
              <div className="flex items-center group-hover:opacity-80 transition-opacity">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute top-0 left-2 w-8 h-8 border-4 border-[#9CCB3B] rounded-t-full rounded-l-full border-b-0 border-r-0 transform rotate-45"></div>
                  <div className="absolute bottom-0 left-2 w-8 h-8 border-4 border-[#009BAB] rounded-b-full rounded-l-full border-t-0 border-r-0 transform -rotate-45"></div>
                </div>
                <div className="ml-2 flex flex-col">
                  <span className="text-3xl font-bold text-[#009BAB] leading-none tracking-tight">Clínica B+</span>
                  <span className="text-[10px] font-bold text-gray-500 tracking-widest mt-1">CENTRO MÉDICO E DIAGNÓSTICOS</span>
                </div>
              </div>
            )}
            
            {/* Overlay hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/60 rounded-lg">
              <div className="flex items-center bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                <Upload className="w-3 h-3 mr-1" />
                Alterar Logo
              </div>
            </div>
          </div>
        </div>
        <div className="text-right flex items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Planejamento de Social Media</h1>
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">{currentWeek?.title.includes('Maio') ? 'Maio' : 'Abril'} 2026</p>
          </div>
          <button 
            onClick={downloadPDF}
            disabled={isDownloading}
            className="hidden md:flex items-center bg-[#009BAB] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#007A88] transition-colors shadow-sm print:hidden disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Gerando PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Baixar PDF
              </>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 print:mt-0 print:px-0 print:max-w-none">
        {/* STRATEGY BANNER */}
        <div className="bg-[#009BAB] rounded-2xl p-8 text-white shadow-md mb-8 print:hidden">
          <h2 className="text-2xl font-bold mb-3">Estratégia do Mês</h2>
          <p className="text-teal-50 max-w-4xl leading-relaxed mb-6 text-lg">
            Posicionamento focado em <strong className="text-white">Autoridade Técnica, Segurança e Acolhimento</strong>. 
            Comunicação focada em qualidade diagnóstica, protocolos completos sem "adicionais ocultos" e cuidado integral com a saúde da mulher, 
            aproveitando as datas comemorativas para gerar conexão emocional.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              12 Posts no Feed
            </div>
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              <Clock className="w-4 h-4 mr-2" />
              3 Posts por Semana
            </div>
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              <Calendar className="w-4 h-4 mr-2" />
              {currentWeek?.title.includes('Maio') ? 'Maio / 2026' : 'Abril / 2026'}
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex overflow-x-auto bg-white rounded-xl shadow-sm p-2 mb-8 border border-gray-100 hide-scrollbar">
          {PLAN_DATA.map((week) => (
            <button
              key={week.id}
              onClick={() => setActiveTab(week.id)}
              className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === week.id
                  ? 'bg-[#009BAB] text-white shadow-md'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              {week.isStories ? (
                <Type className="w-4 h-4 mr-2 opacity-70" />
              ) : (
                <Calendar className="w-4 h-4 mr-2 opacity-70" />
              )}
              {week.title}
            </button>
          ))}
        </div>

        {/* POSTS GRID OR STORIES */}
        {currentWeek?.isStories ? (
          <div className="flex flex-wrap justify-center gap-8 items-start print:block print:w-full">
            {currentWeek.posts.map((story: any) => (
              <div key={story.id} className="print:w-full print:h-screen print:page-break-after-always print:flex print:items-center print:justify-center print:bg-white print:m-0 print:p-0">
                <div className="w-[320px] h-[568px] rounded-[2rem] shadow-xl overflow-hidden relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#9CCB3B] to-[#009BAB] print:scale-125 print:shadow-2xl">
                  {/* Background decorative elements */}
                <div className="absolute top-4 left-4 flex gap-1">
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                </div>
                <div className="absolute top-6 left-4 flex gap-1">
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                </div>
                
                <div className="absolute bottom-4 right-4 flex gap-1">
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                </div>
                <div className="absolute bottom-6 right-4 flex gap-1">
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                </div>

                <div className="absolute -right-16 top-20 text-white/20 font-bold text-6xl transform rotate-90 tracking-widest uppercase">
                  Comunicado
                </div>
                <div className="absolute -left-16 bottom-20 text-white/20 font-bold text-6xl transform -rotate-90 tracking-widest uppercase">
                  Comunicado
                </div>

                {/* Header Badge */}
                <div className="bg-[#007A88] text-white px-6 py-3 rounded-full font-bold text-xl mb-8 z-10 shadow-md text-center">
                  Horário de<br/>
                  <span className="font-normal text-lg">funcionamento</span>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-3xl p-8 w-full z-10 shadow-lg text-center flex flex-col items-center">
                  <h3 className="text-[#009BAB] font-bold text-2xl leading-tight mb-6">
                    {story.title.split(' ').map((word: string, i: number) => (
                      <React.Fragment key={i}>
                        {word}<br/>
                      </React.Fragment>
                    ))}
                  </h3>

                  <div className="mb-6 w-full">
                    <div className="text-[#009BAB] font-bold text-2xl tracking-wide">FECHADO</div>
                    <div className="text-[#007A88] text-sm font-medium">{story.closedDates}</div>
                  </div>

                  <div className="mb-8 w-full">
                    <div className="text-[#009BAB] font-bold text-2xl tracking-wide">ABERTO</div>
                    <div className="text-[#007A88] text-sm font-medium">{story.openDate}</div>
                  </div>

                  <div className="font-serif italic text-gray-500 text-xl">
                    {story.message}
                  </div>
                </div>

                {/* Footer Logo */}
                <div className="mt-8 z-10 flex items-center justify-center">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <div className="absolute top-0 left-1 w-5 h-5 border-2 border-white rounded-t-full rounded-l-full border-b-0 border-r-0 transform rotate-45"></div>
                    <div className="absolute bottom-0 left-1 w-5 h-5 border-2 border-white rounded-b-full rounded-l-full border-t-0 border-r-0 transform -rotate-45"></div>
                  </div>
                  <div className="ml-2 flex flex-col items-start">
                    <span className="text-xl font-bold text-white leading-none tracking-tight">Clínica B+</span>
                    <span className="text-[6px] font-bold text-white tracking-widest mt-0.5">CENTRO MÉDICO E DIAGNÓSTICOS</span>
                  </div>
                </div>
              </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start print:block print:w-full">
            {currentWeek?.posts.map((post: any) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow print:w-full print:h-screen print:border-none print:shadow-none print:rounded-none print:page-break-after-always print:justify-center print:p-12">
                {/* Card Header */}
                <div className="bg-[#007A88] text-white px-5 py-3 flex justify-between items-center print:bg-transparent print:text-[#007A88] print:px-0 print:mb-4">
                  <span className="font-bold tracking-wider text-sm print:text-2xl">POST {post.id}</span>
                  <span className="bg-white/20 px-2.5 py-1 rounded text-xs font-semibold tracking-widest backdrop-blur-sm print:bg-[#007A88] print:text-white print:text-lg print:px-4 print:py-2">
                    {post.type}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col print:p-0 print:flex-1 print:justify-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-5 leading-tight whitespace-pre-line print:text-5xl print:mb-10">
                    {post.headline}
                  </h3>

                  <div className="print:flex print:gap-12 print:items-start">
                    {/* Art Direction */}
                    <div className="bg-[#F4F9F9] border border-[#009BAB]/20 rounded-xl p-4 mb-5 print:flex-1 print:bg-white print:border-2 print:border-[#009BAB]/30 print:p-8 print:rounded-3xl">
                      <div className="flex items-center text-[#009BAB] font-semibold text-sm mb-2 print:text-xl print:mb-4">
                        <ImageIcon className="w-4 h-4 mr-2 print:w-6 print:h-6" />
                        Direcionamento de Arte
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line print:text-2xl print:leading-relaxed">
                        {post.art}
                      </p>
                    </div>

                    {/* Legend */}
                    <div className="print:flex-1">
                      <div className="flex items-center text-gray-800 font-semibold text-sm mb-2 print:text-xl print:mb-4">
                        <Type className="w-4 h-4 mr-2 text-gray-400 print:w-6 print:h-6" />
                        Legenda
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line print:text-2xl print:leading-relaxed">
                        {post.legenda}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* HIDDEN PDF EXPORT CONTAINER */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }} id="pdf-export-container">
        {currentWeek?.isStories ? (
          currentWeek.posts.map((story: any) => (
            <div key={`pdf-${story.id}`} className="pdf-slide w-[1920px] h-[1080px] bg-white flex items-center justify-center relative">
              {/* Header overlay */}
              <div className="absolute top-20 left-20">
                <h2 className="text-5xl font-bold text-[#1f2937]">Planejamento de Social Media</h2>
                <p className="text-3xl text-[#6b7280] uppercase tracking-wider font-semibold mt-2">{currentWeek?.title.includes('Maio') ? 'Maio' : 'Abril'} 2026 • {currentWeek?.title}</p>
              </div>

              <div className="absolute top-20 right-20 text-right">
                <span className="text-4xl font-bold text-[#007A88] block">STORY {story.id}</span>
                <span className="inline-block bg-[#009BAB] text-white px-6 py-2 rounded-full text-2xl font-semibold tracking-widest mt-4">
                  COMUNICADO
                </span>
              </div>

              {/* Story Phone Mockup */}
              <div className="w-[450px] h-[800px] rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col items-center justify-center p-10 bg-gradient-to-br from-[#9CCB3B] to-[#009BAB] border-[12px] border-[#111827]">
                <div className="absolute top-6 left-6 flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-[rgba(255,255,255,0.4)] rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-[rgba(255,255,255,0.4)] rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-[rgba(255,255,255,0.4)] rounded-full"></div>
                </div>
                <div className="absolute top-10 left-6 flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-[rgba(255,255,255,0.4)] rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-[rgba(255,255,255,0.4)] rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-[rgba(255,255,255,0.4)] rounded-full"></div>
                </div>
                
                <div className="absolute bottom-6 right-6 flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-[rgba(255,255,255,0.4)] rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-[rgba(255,255,255,0.4)] rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-[rgba(255,255,255,0.4)] rounded-full"></div>
                </div>
                <div className="absolute bottom-10 right-6 flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-[rgba(255,255,255,0.4)] rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-[rgba(255,255,255,0.4)] rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-[rgba(255,255,255,0.4)] rounded-full"></div>
                </div>

                <div className="absolute -right-24 top-32 text-[rgba(255,255,255,0.2)] font-bold text-8xl transform rotate-90 tracking-widest uppercase">
                  Comunicado
                </div>
                <div className="absolute -left-24 bottom-32 text-[rgba(255,255,255,0.2)] font-bold text-8xl transform -rotate-90 tracking-widest uppercase">
                  Comunicado
                </div>

                <div className="bg-[#007A88] text-white px-8 py-4 rounded-full font-bold text-3xl mb-10 z-10 shadow-md text-center">
                  Horário de<br/>
                  <span className="font-normal text-2xl">funcionamento</span>
                </div>

                <div className="bg-white rounded-3xl p-10 w-full z-10 shadow-lg text-center flex flex-col items-center">
                  <h3 className="text-[#009BAB] font-bold text-4xl leading-tight mb-8">
                    {story.title.split(' ').map((word: string, i: number) => (
                      <React.Fragment key={i}>
                        {word}<br/>
                      </React.Fragment>
                    ))}
                  </h3>

                  <div className="mb-8 w-full">
                    <div className="text-[#009BAB] font-bold text-3xl tracking-wide">FECHADO</div>
                    <div className="text-[#007A88] text-xl font-medium mt-2">{story.closedDates}</div>
                  </div>

                  <div className="mb-10 w-full">
                    <div className="text-[#009BAB] font-bold text-3xl tracking-wide">ABERTO</div>
                    <div className="text-[#007A88] text-xl font-medium mt-2">{story.openDate}</div>
                  </div>

                  <div className="font-serif italic text-[#6b7280] text-2xl">
                    {story.message}
                  </div>
                </div>

                <div className="mt-12 z-10 flex items-center justify-center">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute top-0 left-1 w-8 h-8 border-4 border-white rounded-t-full rounded-l-full border-b-0 border-r-0 transform rotate-45"></div>
                    <div className="absolute bottom-0 left-1 w-8 h-8 border-4 border-white rounded-b-full rounded-l-full border-t-0 border-r-0 transform -rotate-45"></div>
                  </div>
                  <div className="ml-4 flex flex-col items-start">
                    <span className="text-3xl font-bold text-white leading-none tracking-tight">Clínica B+</span>
                    <span className="text-[10px] font-bold text-white tracking-widest mt-1">CENTRO MÉDICO E DIAGNÓSTICOS</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          currentWeek?.posts.map((post: any) => (
            <div key={`pdf-${post.id}`} className="pdf-slide w-[1920px] h-[1080px] bg-white p-20 flex flex-col justify-between">
              {/* Header */}
              <div className="flex justify-between items-center border-b-4 border-[#009BAB] pb-8 mb-12">
                <div>
                  <h2 className="text-5xl font-bold text-[#1f2937]">Planejamento de Social Media</h2>
                  <p className="text-3xl text-[#6b7280] uppercase tracking-wider font-semibold mt-2">{currentWeek?.title.includes('Maio') ? 'Maio' : 'Abril'} 2026 • {currentWeek?.title}</p>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-bold text-[#007A88] block">POST {post.id}</span>
                  <span className="inline-block bg-[#009BAB] text-white px-6 py-2 rounded-full text-2xl font-semibold tracking-widest mt-4">
                    {post.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-6xl font-bold text-[#111827] mb-16 leading-tight whitespace-pre-line">
                  {post.headline}
                </h3>

                <div className="flex gap-16 items-start">
                  {/* Art Direction */}
                  <div className="flex-1 bg-[#F4F9F9] border-l-8 border-[#009BAB] p-12 rounded-r-3xl">
                    <div className="flex items-center text-[#009BAB] font-bold text-3xl mb-6">
                      <ImageIcon className="w-10 h-10 mr-4" />
                      Direcionamento de Arte
                    </div>
                    <p className="text-3xl text-[#374151] leading-relaxed whitespace-pre-line">
                      {post.art}
                    </p>
                  </div>

                  {/* Legend */}
                  <div className="flex-1 p-12">
                    <div className="flex items-center text-[#1f2937] font-bold text-3xl mb-6">
                      <Type className="w-10 h-10 mr-4 text-[#9ca3af]" />
                      Legenda
                    </div>
                    <p className="text-3xl text-[#374151] leading-relaxed whitespace-pre-line">
                      {post.legenda}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t-2 border-[#f3f4f6] flex justify-between items-center">
                <div className="flex items-center">
                  <div className="relative w-12 h-12 flex items-center justify-center bg-[#009BAB] rounded-full">
                     <span className="text-white font-bold text-xl">B+</span>
                  </div>
                  <div className="ml-4 flex flex-col items-start">
                    <span className="text-2xl font-bold text-[#1f2937] leading-none tracking-tight">Clínica B+</span>
                    <span className="text-sm font-bold text-[#6b7280] tracking-widest mt-1">CENTRO MÉDICO E DIAGNÓSTICOS</span>
                  </div>
                </div>
                <div className="text-2xl text-[#9ca3af] font-medium">
                  Confidencial • Uso Interno
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
