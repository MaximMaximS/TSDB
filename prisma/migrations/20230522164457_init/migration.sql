-- CreateTable
CREATE TABLE "Episode" (
    "id" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,
    "episode" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "premiere" TIMESTAMP(3) NOT NULL,
    "plot" TEXT NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EpisodeToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Episode_season_episode_key" ON "Episode"("season", "episode");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_EpisodeToUser_AB_unique" ON "_EpisodeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EpisodeToUser_B_index" ON "_EpisodeToUser"("B");

-- AddForeignKey
ALTER TABLE "_EpisodeToUser" ADD CONSTRAINT "_EpisodeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EpisodeToUser" ADD CONSTRAINT "_EpisodeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
