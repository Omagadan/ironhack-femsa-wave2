# Usa la imagen oficial de Node.js como base
FROM node:16

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que escucha la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
