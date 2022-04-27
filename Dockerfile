FROM node:17.9.0 as build

WORKDIR /app

COPY package*.json .

RUN npm install --force

#RUN touch ~/.bashrc && chmod +x ~/.bashrc
#RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
#RUN . ~/.nvm/nvm.sh && source ~/.bashrc && nvm install node


COPY . .
RUN npm run build

FROM nginx:1.19

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html 