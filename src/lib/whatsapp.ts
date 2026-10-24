export const WHATSAPP_NUMBER = '919944898753';

export function whatsappBookingUrl(source: string, format?: string): string {
  const message = [
    '*Free 1-on-1 Skill Evaluation Request — Coimbatore Chess Centre*',
    '',
    `*Source:* ${source}`,
    format ? `*Preferred Format:* ${format}` : '*Preferred Format:* Please advise',
    '*Student Name:* ',
    '*Age:* ',
    '*Current Level:* ',
    '*Preferred Language:* ',
    '*Preferred Timezone/Slot:* ',
    '*Parent/Guardian Name:* ',
    '*Contact Number:* ',
    '',
    'I would like to book a free skill evaluation. Please confirm the next available slot.',
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
