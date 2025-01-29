import axios from 'axios';
import type { Filters, GeneratedName } from '../types';

const SYSTEM_PROMPT = `You are a creative naming expert. Generate unique, memorable names that match the given requirements. 

Rules for names:
- Never use numbers or bullet points in the output
- Each name must be unique and creative
- Provide a clear, concise description for each name
- Format each response exactly as: NameHere: Description of the name here
- Put each name-description pair on its own line
- Descriptions should explain why the name fits the requirements`;

export async function generateNames(query: string, filters: Filters): Promise<GeneratedName[]> {
  const prompt = `Generate 5 unique names based on these requirements:
- Keywords: ${query}
- Purpose: ${filters.purpose.value}
- Style: ${filters.style.value}
- Length: ${filters.length.value}
- Language: ${filters.language.value}
${filters.specialRequirements.length > 0 ? `- Special Requirements: ${filters.specialRequirements.join(', ')}` : ''}`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: prompt + '\n\nIMPORTANT: Do not include any numbers, bullet points, or prefixes in the output. Start directly with the name.'
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices[0].message.content;
    const names = content
      .split('\n')
      .filter(Boolean)
      .reduce((acc: GeneratedName[], line: string) => {
        const trimmedLine = line.trim();
        if (!trimmedLine || !trimmedLine.includes(': ')) return acc;
        
        const [name, ...descParts] = trimmedLine.split(': ');
        const description = descParts.join(': ').trim();
        
        if (!name || !description) return acc;
        
        return [...acc, {
          id: String(acc.length + 1),
          name: name.trim(),
          description: description
        }];
      }, [])
      .slice(0, 5);

    return names;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate names. Please try again.');
  }
}