-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "twitterId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EVMWallet" (
    "id" SERIAL NOT NULL,
    "address" VARCHAR(40) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "EVMWallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_twitterId_key" ON "User"("twitterId");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "EVMWallet_address_key" ON "EVMWallet"("address");

-- CreateIndex
CREATE UNIQUE INDEX "EVMWallet_userId_key" ON "EVMWallet"("userId");

-- AddForeignKey
ALTER TABLE "EVMWallet" ADD CONSTRAINT "EVMWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
