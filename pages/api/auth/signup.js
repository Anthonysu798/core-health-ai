import clientPromise from "../../../lib/mongodb";
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(422).json({ error: 'Missing required fields' });
    }

    try {
      const client = await clientPromise;
      const db = client.db();

      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(422).json({ error: 'Email already exists' });
      }

      const hashedPassword = await hash(password, 12);
      const result = await db.collection('users').insertOne({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: 'User created', userId: result.insertedId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}