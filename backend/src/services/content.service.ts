import prisma from "../config/prisma";

interface CreateContentData {
  title: string;
  description?: string;
  platform: string;
  contentDate: string;
  status?: string;
  userId: string;
}

interface UpdateContentData {
  title?: string;
  description?: string;
  platform?: string;
  contentDate?: string;
  status?: string;
}

export const createContent = async (data: CreateContentData) => {
  return prisma.content.create({
    data: {
      title: data.title,
      description: data.description,
      platform: data.platform,
      contentDate: new Date(data.contentDate),
      status: data.status || "PLANNED",
      userId: data.userId,
    },
  });
};

export const getUserContents = async (userId: string) => {
  return prisma.content.findMany({
    where: {
      userId,
    },
    orderBy: {
      contentDate: "asc",
    },
  });
};

export const updateContent = async (
  contentId: string,
  userId: string,
  data: UpdateContentData
) => {
  const existingContent = await prisma.content.findFirst({
    where: {
      id: contentId,
      userId,
    },
  });

  if (!existingContent) {
    throw new Error("Content not found");
  }

  return prisma.content.update({
    where: {
      id: contentId,
    },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && {
        description: data.description,
      }),
      ...(data.platform !== undefined && {
        platform: data.platform,
      }),
      ...(data.contentDate !== undefined && {
        contentDate: new Date(data.contentDate),
      }),
      ...(data.status !== undefined && {
        status: data.status,
      }),
    },
  });
};

export const deleteContent = async (
  contentId: string,
  userId: string
) => {
  const existingContent = await prisma.content.findFirst({
    where: {
      id: contentId,
      userId,
    },
  });

  if (!existingContent) {
    throw new Error("Content not found");
  }

  return prisma.content.delete({
    where: {
      id: contentId,
    },
  });
};