---
description: Padroes de nomenclatura e etrutura em entidades,
repositorios, services, controllers e DTO s
alwaysApply: true
---
# Rules: Nomenclatura e Estrutura
## Arquivos
- Entidades: `src/entities/<Nome>.entity.ts`
- Repositorios: `src/repositories/<Nome>.repository.ts`
- Services: `src/services/<Nome>.service.ts`
- Controllers: `src/controllers/<Nome>.controller.ts`
- DTOs: `src/dtos/<Nome>.dto.ts`
## Nomenclatura
- Classes sempre em PascalCase
- Arquivos sempre me kebab-case
- Metodos sempre em camelCase
- Nunca abreviar nomes(usar `UserRepository` , nunca `UserRepo`)
## Restrições
- Controller nunca importa diretamente uma entidadede domínio
- Service nunca acessa o banco diretamente(sempre via repository)
- DTO nunca obtém lógica de negócio
- Toda classe exporta apenas um export default