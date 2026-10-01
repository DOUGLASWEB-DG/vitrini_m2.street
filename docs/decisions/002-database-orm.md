# Decisão Arquitetural: Camada de Banco de Dados e ORM

## Contexto
Precisamos interagir com o PostgreSQL (Supabase) gerenciando um modelo relacional complexo de multi-tenancy.

## Alternativas Consideradas
1. **Supabase Client (PostgREST):**
   - *Prós:* Suporte nativo a Row Level Security (RLS) sem configurações adicionais.
   - *Contras:* Tipagem TypeScript pode ser verbosa, queries relacionais profundas (joins) usam uma sintaxe própria baseada em strings, dificultando manutenção.

2. **Drizzle ORM:**
   - *Prós:* Leve, rápido, SQL-like.
   - *Contras:* Curva de aprendizado um pouco maior para a equipe, menos maduro que Prisma em certos edge cases de migrações complexas.

3. **Prisma ORM:**
   - *Prós:* Excelente Developer Experience (DX), tipagem end-to-end perfeita, migrações declarativas seguras.
   - *Contras:* Lida mal com PostgreSQL RLS em ambientes serverless nativamente devido ao connection pooling.

## Decisão
Foi escolhida a **Opção 3 (Prisma ORM)**.

## Justificativa
A agilidade e segurança tipada do Prisma compensam os desafios. Para o isolamento multi-tenant, em vez de depender exclusivamente de RLS no nível do banco, implementaremos o isolamento no nível da aplicação utilizando **Prisma Client Extensions**. A extensão injetará automaticamente a cláusula `where: { tenantId }` em todas as consultas baseadas no contexto da requisição, garantindo segurança sem conflitos de connection pooling.
