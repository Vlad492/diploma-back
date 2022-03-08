FROM anatoliikasianov/nest-and-redis

COPY . .

RUN npm i
RUN npm run build

CMD ["npm", "start"]
