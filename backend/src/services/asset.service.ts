import prisma from "../config/prisma";

interface CreateAssetData {
  originalName: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  userId: string;
}

export const createAsset = async (data: CreateAssetData) => {
  return prisma.asset.create({
    data,
  });
};

export const getUserAssets = async (userId: string) => {
  return prisma.asset.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findUserAsset = async (
  assetId: string,
  userId: string
) => {
  return prisma.asset.findFirst({
    where: {
      id: assetId,
      userId,
    },
  });
};

export const deleteAsset = async (assetId: string) => {
  return prisma.asset.delete({
    where: {
      id: assetId,
    },
  });
};