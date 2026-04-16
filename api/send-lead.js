export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, phone, concern, previous, birth_day, birth_month, birth_year, country, message, creo } = req.body;

  const text = `🔥 Новый лид!\n\n` +
               `👤 Имя: ${name || '-'}\n` +
               `📞 Телефон: ${phone || '-'}\n` +
               `❓ Проблема: ${concern || '-'}\n` +
               `🔮 Обращался: ${previous || '-'}\n` +
               `🌍 Страна: ${country || '-'}\n` +
               `📅 Дата рождения: ${birth_day || ''}.${birth_month || ''}.${birth_year || ''}\n` +
               `💬 Заявка: ${message || '-'}\n` +
               `📣 Крео: ${creo || '-'}\n` +
               `🕒 ${new Date().toLocaleString('ru-RU')}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot1.8789034008:AAFZi-d5Df6DUUBqERaYclYFJEfoo_fH91g/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: -3775101119,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ success: false });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
