


/* Public entry point / clean exports 

Convenience file that allows you to simplify imports, hide internal file structure and create public API for folder. 
Only useful when imports get messy and want a clean abstraction

When you write import { Climb } from "../features/climbs";, typescript interpets as find what that refers to and try, in order:

../features/climbs.ts
../features/climbs.tsx
../features/climbs/index.ts
../features/climbs/index.tsx

"Barrel file"
*/

