-- Create the database
CREATE DATABASE anns_bakery;

-- Table: users (untuk pengguna)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: categories (untuk kategori kue)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Table: cakes (untuk kue)
CREATE TABLE cakes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INT,
    description TEXT,
    price INT NOT NULL,
    stock INT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
); 

-- Table: orders (untuk pesanan)
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT,
    date DATE NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_address TEXT NOT NULL,
    total_price INT NOT NULL,
    total_product INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table: detail_order (untuk detail pesanan)
CREATE TABLE detail_order (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_price INT NOT NULL,
    amount INT NOT NULL,
    total_price INT NOT NULL,
    order_id INT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Insert sample data into users table
INSERT INTO users (email, username, password, role) VALUES
('admin123@example.com', 'admin123', '$argon2id$v=19$m=65536,t=3,p=4$qIlodSQD5fsrgePZe5LhzA$gkNQFhL33pvwjiDF7rxRWWlRM9t501V80w1ts0cpWGg', 'admin'),
('cust1@example.com', 'cust1', '$argon2id$v=19$m=65536,t=3,p=4$7RX2CO3WO3sugMsF68WiBg$2FppYqNOW6JlGtLyB4CgOHtDehrT4boDYr5wOenrqlc', 'kasir');

-- Insert sample data into categories table
INSERT INTO categories (name, description) VALUES
('Chocolate', 'Cakes made with rich chocolate flavors'),
('Fruit', 'Cakes made with fresh fruit ingredients'),
('Classic', 'Traditional cakes loved by everyone');

-- Insert sample data into cakes table
INSERT INTO cakes (name, category_id, description, price, stock, image_url) VALUES
('Tres Leches Red Berry', 2, 'Kue lembut dan moist yang direndam dalam tiga jenis susu, dengan topping buah berry segar.', 25000, 20, 'https://www.annsbakehouse.com/web/image/product.template/3973/image_512/Tres%20Leches%20Red%20Berry?unique=50eca29'),
('Tres Leches Matcha', 3, 'Kue sponge beraroma matcha yang direndam dalam tiga jenis susu, memberikan sentuhan khas Jepang.', 30000, 15, 'https://www.annsbakehouse.com/web/image/product.template/3972/image_512/Tres%20Leches%20Matcha?unique=96cc297'),
('Sacher Torte', 1, 'Kue cokelat klasik Austria yang diisi dengan selai aprikot dan dilapisi icing cokelat hitam.', 35000, 10, 'https://www.annsbakehouse.com/web/image/product.template/3947/image_512/Sacher%20Torte?unique=634b17b'),
('New York Cheesecake', 3, 'Cheesecake khas New York yang kaya dan creamy dengan dasar graham cracker yang renyah.', 28000, 25, 'https://www.annsbakehouse.com/web/image/product.template/3915/image_512/New%20York%20Cheesecake?unique=fda39f1'),
('Key Lime Pie Special', 2, 'Pie dengan rasa segar dan asam yang terbuat dari jus jeruk nipis, dilengkapi dengan krim kocok.', 24000, 18, 'https://www.annsbakehouse.com/web/image/product.template/3905/image_512/Key%20Lime%20Pie%20Special?unique=966d738'),
('German Black Forest', 1, 'Kue tradisional Jerman yang terdiri dari lapisan sponge cokelat, ceri, dan krim kocok.', 35000, 12, 'https://www.annsbakehouse.com/web/image/product.template/3894/image_512/German%20Black%20Forest?unique=99de697'),
('Carrot Cake', 3, 'Kue yang moist dan kaya rempah, terbuat dari wortel parut, kenari, dan dilapisi dengan frosting krim keju.', 27000, 15, 'https://www.annsbakehouse.com/web/image/product.template/3875/image_512/Carrot%20Cake?unique=42b8c70'),
('Chocolate Salted Caramel Tart', 1, 'Tart mewah dengan kerak cokelat, diisi dengan caramel asin dan dilapisi ganache cokelat.', 40000, 8, 'https://www.annsbakehouse.com/web/image/product.template/3880/image_512/Chocolate%20Salted%20Caramel%20Tart?unique=2e1e238'),
('Apple Mille Feuille', 2, 'Pastry Prancis yang lembut dengan lapisan puff pastry, diisi dengan custard dan apel karamel.', 22000, 30, 'https://www.annsbakehouse.com/web/image/product.template/3866/image_512/Apple%20Mille%20Feuille?unique=00748c5'),
('Chocolate Madness', 1, 'Kue cokelat yang sangat lezat dengan lapisan mousse cokelat yang kaya dan dilapisi glasir cokelat.', 25000, 22, 'https://colettelola.com/cdn/shop/products/CHOCOLATE_MADNESS_CROP1.jpg?v=1631004411&width=160'),
('Fresher Berry', 2, 'Kue ringan dan segar dengan lapisan sponge cake, berry segar, dan krim kocok.', 45000, 6, 'https://colettelola.com/cdn/shop/products/2ysqr--revise.jpg?v=1603811459&width=675'),
('Say Cheese! Biscoff', 3, 'Cheesecake creamy dengan topping selai Biscoff dan remah-remah Biscoff.', 32000, 10, 'https://colettelola.com/cdn/shop/products/lotusweb_4.jpg?v=1609994355&width=675'),
('Chocolate Sunday', 1, 'Kue cokelat yang kaya dengan lapisan fudge cokelat dan dilapisi ganache cokelat.', 28000, 14, 'https://colettelola.com/cdn/shop/products/CHOCOLATE_SUNDAY_CROP1.jpg?v=1559970905&width=675'),
('Galaxy', 3, 'Kue bertema galaksi dengan lapisan cokelat yang kaya dan dekorasi bernuansa galaksi.', 37000, 12, 'https://colettelola.com/cdn/shop/products/GALAXY_CAKE_CROP1.jpg?v=1559971059&width=675'),
('Mango Sunset Shortcake', 2, 'Kue shortcake ringan dan lembut dengan lapisan potongan mangga segar dan krim kocok.', 26000, 20, 'https://colettelola.com/cdn/shop/files/Manggocake_2.jpg?v=1690455496&width=675');
