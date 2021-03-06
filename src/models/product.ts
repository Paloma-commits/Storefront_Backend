import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class productStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';

      const result = await conn.query(sql, [product.name, product.price]);
      const new_prod = result.rows[0];
      conn.release();
      return new_prod;
    } catch (err) {
      throw new Error(`Could not add new ${product.name}, error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const conn = await client.connect();

      const sql = 'DELETE FROM products WHERE id=($1)';
      // @ts-ignore

      const result = await conn.query(sql, [id]);

      const prod = result.rows[0];

      return prod;

      conn.release();
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
