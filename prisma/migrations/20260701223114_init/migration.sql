-- CreateTable
CREATE TABLE "ProcessedEmail" (
    "id" SERIAL NOT NULL,
    "gmailMessageId" TEXT NOT NULL,
    "threadId" TEXT,
    "sender" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "snippet" TEXT,
    "category" TEXT NOT NULL,
    "importance" TEXT NOT NULL,
    "recommendedAction" TEXT NOT NULL,
    "classificationReason" TEXT,
    "aiCategory" TEXT,
    "aiConfidence" DOUBLE PRECISION,
    "aiReason" TEXT,
    "labelApplied" BOOLEAN NOT NULL DEFAULT false,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProcessedEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProcessedEmail_gmailMessageId_key" ON "ProcessedEmail"("gmailMessageId");
