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

-- CreateIndex
CREATE UNIQUE INDEX "Episode_season_episode_key" ON "Episode"("season", "episode");
