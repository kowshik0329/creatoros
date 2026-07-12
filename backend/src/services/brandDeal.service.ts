import prisma from "../config/prisma";

interface CreateBrandDealData {
  brandName: string;
  campaign: string;
  amount: number;
  status?: string;
  userId: string;
}

export const createBrandDeal = async (
  data: CreateBrandDealData
) => {
  return prisma.brandDeal.create({
    data: {
      brandName: data.brandName,
      campaign: data.campaign,
      amount: data.amount,
      status: data.status || "PENDING",
      userId: data.userId,
    },
  });
};

export const getUserBrandDeals = async (userId: string) => {
  return prisma.brandDeal.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deleteBrandDeal = async (
  dealId: string,
  userId: string
) => {
  const deal = await prisma.brandDeal.findFirst({
    where: {
      id: dealId,
      userId,
    },
  });

  if (!deal) {
    throw new Error("Brand deal not found");
  }

  return prisma.brandDeal.delete({
    where: {
      id: dealId,
    },
  });
};