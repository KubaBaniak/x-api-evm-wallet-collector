App for collecting EVM wallets.

## Starting the ap:

1. Create `.env` files in both `frontend` and `backend` directory (use `.env.example`).
2. Run `docker compose up` 

Notes:
- Please use `0.0.0.0` as backend and frontend address when running the app with `docker compose`.
- For `DATABASE_URL` variable, if running by docker use `db` as host.
- Change `TWITTER_REDIRECT_URI` in `./backend/src/auth/constants.ts` to the one provided in app settings on X devleoper platform (`ClientID`, and `Client Secret` are necessary as well).

If `docker compose up` somehow fails (xd), start only the database with `docker compose up db`, and run frontend and backend separately.
- Backend: go to the `./backend`, `npm i` or `npm ci` and `npx prisma migrate dev` or `npx prisma migrate prod`, `npx prisma generate` and finally `npm run start`
- Frontend: go to the `./frontend`, `npm i` or `npm ci` and finally `npm run start`

Remember about the Notes above!

That's pretty much it. There is a high change that I missed something for deployment here - in that case feel free to reach out to me at kuba121201@gmail.com
