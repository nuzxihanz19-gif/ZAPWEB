# Setup Instructions

## 1. Install Dependencies
```bash
npm install
```

## 2. Environment Setup
Copy `.env.sample` to `.env.local` and fill in the values.
```bash
cp .env.sample .env.local
```

## 3. Run Local Development
```bash
npm run dev
```
Access the admin panel at: http://localhost:3000/admin

## 4. API Testing (cURL)
```bash
# Get a token first (simulated in this example context, or generate one using jose)
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -F "name=Produk Baru" \
  -F "title=Judul Keren" \
  -F "description=Deskripsi produk..." \
  -F "price=150000" \
  -F "lynkUrl=https://lynk.co/demo" \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
```
