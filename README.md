# Express-GraphQL Projesi

Bu proje, Express ve GraphQL kullanarak bir GraphQL API oluşturmayı hedeflemektedir. Proje, personel bilgilerini yönetmek için gerekli olan temel yapı taşlarını içermektedir.

## Başlangıç

### Gereksinimler

- Node.js (v14 veya üstü)
- npm veya Yarn

### Kurulum

Proje dizinine gidin ve aşağıdaki komutları çalıştırarak gerekli paketleri yükleyin:

```bash
npm init -y
npm install express express-graphql graphql
npm  install nodemon --dev
```

### Sunucunun Başlatılması

Sunucuyu başlatmak için `nodemon` kullanabilirsiniz. Aşağıdaki komutu çalıştırarak sunucunuzu başlatın:

```bash
npx nodemon server.js
```

Sunucunuz başarıyla çalıştığında, [http://localhost:4000/graphql](http://localhost:4000/graphql) adresine giderek GraphiQL test ortamına erişebilirsiniz.

### JSON Server Kurulumu

Ayrıca, JSON formatında bir veri sunucusu oluşturmak için `json-server` kullanacağız. `package.json` dosyasının `scripts` kısmına aşağıdaki satırı ekleyin:

```json
"json:server": "json-server --watch data.json"
```

JSON sunucusunu başlatmak için terminalde aşağıdaki komutu çalıştırın:

```bash
npm run json:server
```

## GraphQL Yapısı

### Personel Tipi

Projede bir `personel` tipi oluşturduk. Aşağıda, bu tipin örnek kullanımları yer almaktadır.

#### Query Örnekleri

1. **Tek bir personeli sorgulama**

```graphql
{
  personel(id: "3") {
    id,
    email,
    isim,
    yas
  }
}
```

2. **Tüm personelleri sorgulama**

```graphql
{
  personeller {
    isim,
    yas
  }
}
```

### Mutation

GraphQL ile veritabanına ekleme, güncelleme ve silme işlemleri için `mutation` kullanılır. Aşağıda örnek bir `mutation` yapısı yer almaktadır:

```graphql
mutation {
  addPersonel(input: {
    email: "example@example.com",
    isim: "Örnek İsim",
    yas: 30
  }) {
    id
    email
    isim
    yas
  }
}
```

## Kullanım

Projeniz çalıştığında GraphiQL ortamında yukarıdaki sorguları ve mutasyonları deneyerek personel verilerinizi yönetebilirsiniz.


