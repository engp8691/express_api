FROM node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

ENV DB_HOST='dpg-d17dftqdbo4c73fqk2eg-a.ohio-postgres.render.com'
ENV DB_PORT=5432
ENV DB_NAME='cradl'
ENV DB_USER='cradl'
ENV DB_PASS='EGlOzWDdcNYywV25FboD7ldsjM9MCQ3Y'

WORKDIR /app

RUN addgroup --system backend && \
    adduser --system -G backend backend

# Copy backend build output from monorepo subfolder
COPY dist backend/

# Copy backend package.json from monorepo subfolder
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

RUN chown -R backend:backend .

USER backend

CMD ["node", "backend/server.js"]
