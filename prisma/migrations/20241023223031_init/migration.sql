-- CreateTable
CREATE TABLE "entity" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connection" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" TEXT NOT NULL,
    "source_entity_id" UUID NOT NULL,
    "target_entity_id" UUID NOT NULL,
    "metadata" JSONB,
    "weight" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "connection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "connection" ADD CONSTRAINT "connection_source_entity_id_fkey" FOREIGN KEY ("source_entity_id") REFERENCES "entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection" ADD CONSTRAINT "connection_target_entity_id_fkey" FOREIGN KEY ("target_entity_id") REFERENCES "entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
