# Arquitetura do Sistema

## Visão Geral
SaaS Multi-tenant para catálogos digitais com foco em mobile/social commerce e checkout via WhatsApp.

## Stack Tecnológica
- **Frontend/Backend:** Next.js (App Router, React, TypeScript).
- **Estilização:** Tailwind CSS (com variáveis dinâmicas de tema injetadas por tenant).
- **Banco de Dados:** PostgreSQL hospedado no Supabase.
- **ORM:** Prisma.
- **Autenticação:** Supabase Auth.
- **Storage:** Supabase Storage (Buckets).
- **Hospedagem:** Vercel (Web), Supabase (BaaS).

## Isolamento de Dados (Multi-tenancy)
Utiliza-se o modelo de "Logical Isolation" (Banco único, schema único). Todas as tabelas pertinentes a negócios possuem a foreign key `tenantId`. A filtragem de segurança é garantida na camada de aplicação através de extensões do Prisma (Global Default Scopes).

## Fluxo de Pedidos
Modelo de persistência por **Snapshot**. Um pedido (Order) copia as informações vitais do produto (nome, preço, variante) no momento exato do checkout. Alterações futuras no catálogo não afetam o histórico de vendas do Lojista ou a precisão do faturamento.
