# Decisão Arquitetural: Roteamento de Tenants

## Contexto
O sistema precisa identificar qual loja (tenant) está sendo acessada pelo cliente final e pelo administrador. 

## Alternativas Consideradas
1. **Subdomínios (loja.meusaas.com):**
   - *Prós:* Aparência mais profissional e "white-label".
   - *Contras:* Requer configuração de Wildcard DNS, certificados SSL dinâmicos e Edge Middleware complexo no Vercel (o que consome limites do plano Pro em escala).

2. **Baseado em Caminho / Path-based (meusaas.com/loja):**
   - *Prós:* Simples, escalável infinitamente sem custo extra de infraestrutura, roteamento nativo do Next.js App Router usando `/[tenantSlug]`.
   - *Contras:* Aparência ligeiramente menos proprietária para o lojista no curto prazo.

## Decisão
Foi escolhida a **Opção 2 (Path-based)** para o MVP.

## Justificativa
O foco do MVP é validar o modelo de negócios, o isolamento de dados e o fluxo de pedidos no WhatsApp. A complexidade de infraestrutura de subdomínios atrasaria a entrega. A arquitetura path-based permite que a lógica de aplicação seja totalmente desenvolvida e, no futuro, adaptada para subdomínios com mudanças apenas na camada de roteamento (Middleware).
