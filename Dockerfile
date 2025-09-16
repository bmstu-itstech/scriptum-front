# ---- БИЛДЕР ----
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем зависимости отдельно, чтобы использовать кэш
COPY package.json yarn.lock ./

# Установка зависимостей
RUN yarn install --frozen-lockfile

# Копируем оставшиеся файлы проекта
COPY . .

# Сборка Next.js проекта
RUN yarn build

# ---- РАНТАЙМ ----
FROM node:20-alpine AS runner

WORKDIR /app

# Создаем непривилегированного пользователя
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Устанавливаем NODE_ENV
ENV NODE_ENV=production

# Копируем только нужные файлы и зависимости
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Копируем собранное приложение из builder
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./

# Переключаемся на непривилегированного пользователя
USER nextjs

# Порт и команда запуска
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["yarn", "start"]
