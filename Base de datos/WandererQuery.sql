CREATE TABLE Pago (
    id_pago INT IDENTITY(1,1) PRIMARY KEY,
    factura_id int,
    user_id int,
    tipo_pago varchar(30) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (factura_id) REFERENCES factura(id_factura)
);