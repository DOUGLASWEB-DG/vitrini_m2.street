import { CartItem } from '../store/cartStore';

export const generateWhatsAppLink = (items: CartItem[]) => {
  const phoneNumber = "5511999999999"; // Substitua pelo seu número do WhatsApp

  if (items.length === 0) return `https://wa.me/${phoneNumber}`;

  let message = "Olá M² Street! Gostaria de finalizar o seguinte pedido:\n\n";
  
  let total = 0;
  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `${index + 1}. *${item.name}*\n`;
    message += `Tamanho: ${item.size} | Qtd: ${item.quantity}\n`;
    message += `Subtotal: R$ ${itemTotal.toFixed(2).replace('.', ',')}\n\n`;
  });

  message += `*Total da Compra: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
  message += "Como podemos seguir com o pagamento e envio?";

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
