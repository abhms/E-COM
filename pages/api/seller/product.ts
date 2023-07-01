import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while parsing the form data' });
        return;
      }

      const { description, productname, price, selectedProductType } = fields;
      console.log(description, productname, price, selectedProductType);

      // Access file data if needed
      console.log(files);

      res.status(200).json({ message: 'User created successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}
