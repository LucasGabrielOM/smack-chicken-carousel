export interface CarouselItem {
  tag?: string;
  titleLine1: string;
  titleLine2?: string;
  desc?: string;
  img: string;
  ctaText?: string;
  ctaUrl?: string;
  price?: string;
  badge?: string;
}

export const smackDishes: CarouselItem[] = [
  {
    tag: "#MaisVendido",
    titleLine1: "SMACK FRESH",
    titleLine2: "– BURGER GOURMET",
    desc: "Tirinhas super crocantes, queijo derretido, alface roxa fresca, tomate suculento e molho especial no pão brioche com gergelim.",
    img: "/images/smack/1-smack-fresh-burger.jpg",
    ctaText: "Pedir no iFood",
    ctaUrl: "https://www.ifood.com.br/delivery/florianopolis-sc/smack-chicken-frango-frito-no-balde-estreito/93484d61-4553-4caf-b136-d1a0f5e73ecf?utm_medium=share",
    price: "R$ 39,90",
    badge: "BURGER"
  },
  {
    tag: "#ChefSpecial",
    titleLine1: "BAGUETE POWER",
    titleLine2: "– BACON & CHEDDAR",
    desc: "Frango crocante em tiras douradas, cascata de queijo derretido, fatias de bacon crocante e batatas fritas sequinhas.",
    img: "/images/smack/2-smack-baguete-power.jpg",
    ctaText: "Pedir no iFood",
    ctaUrl: "https://www.ifood.com.br/delivery/florianopolis-sc/smack-chicken-frango-frito-no-balde-estreito/93484d61-4553-4caf-b136-d1a0f5e73ecf?utm_medium=share",
    price: "R$ 49,90",
    badge: "ESPECIAL"
  },
  {
    tag: "#ParaGalera",
    titleLine1: "BALDE SMACK G",
    titleLine2: "+ 4 MOLHOS & COCA",
    desc: "Balde com 800g de frango ultracrocante empanado à mão na hora, 4 potinhos de molhos artesanais e Coca-Cola gelada.",
    img: "/images/smack/3-smack-balde-combo.jpg",
    ctaText: "Pedir no iFood",
    ctaUrl: "https://www.ifood.com.br/delivery/florianopolis-sc/smack-chicken-frango-frito-no-balde-estreito/93484d61-4553-4caf-b136-d1a0f5e73ecf?utm_medium=share",
    price: "R$ 79,99",
    badge: "COMBO"
  },
  {
    tag: "#PuroCrunch",
    titleLine1: "TIRAS SUPREME",
    titleLine2: "– CROCANTE DE VERDADE",
    desc: "100% peito de frango selecionado, frito na hora com o tempero secreto Smack. O crunch inesquecível de Florianópolis.",
    img: "/images/smack/4-smack-tiras-supreme.jpg",
    ctaText: "Pedir no iFood",
    ctaUrl: "https://www.ifood.com.br/delivery/florianopolis-sc/smack-chicken-frango-frito-no-balde-estreito/93484d61-4553-4caf-b136-d1a0f5e73ecf?utm_medium=share",
    price: "A partir de R$ 26,99",
    badge: "BALDE"
  },
  {
    tag: "#AlmocoExecutivo",
    titleLine1: "MARMITA SMACK",
    titleLine2: "– EXECUTIVA COMPLETA",
    desc: "O prato perfeito do dia: tiras de frango frito crocante, arroz branco soltinho, feijão caseiro e batatas fritas.",
    img: "/images/smack/5-smack-marmita-executiva.png",
    ctaText: "Pedir no iFood",
    ctaUrl: "https://www.ifood.com.br/delivery/florianopolis-sc/smack-chicken-frango-frito-no-balde-estreito/93484d61-4553-4caf-b136-d1a0f5e73ecf?utm_medium=share",
    price: "R$ 29,90",
    badge: "MARMITA"
  },
  {
    tag: "#ParaOsPequenos",
    titleLine1: "SMACK KIDS",
    titleLine2: "+ BATATAS SMILE",
    desc: "Pão brioche fofinho, frango crocante por fora e macio por dentro, queijo cheddar cremoso com 150g de batata smile.",
    img: "/images/smack/6-smack-kids-smile.jpg",
    ctaText: "Pedir no iFood",
    ctaUrl: "https://www.ifood.com.br/delivery/florianopolis-sc/smack-chicken-frango-frito-no-balde-estreito/93484d61-4553-4caf-b136-d1a0f5e73ecf?utm_medium=share",
    price: "R$ 32,90",
    badge: "KIDS"
  }
];
