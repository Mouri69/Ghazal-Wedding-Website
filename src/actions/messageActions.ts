"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Verify admin auth
export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth');
  return authCookie?.value === 'true';
}

// Authenticate Admin
export async function authenticateAdmin(password: string) {
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    return { success: true };
  }
  return { success: false, error: "Invalid password" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
  revalidatePath('/admin');
}

// Submit a new guestbook message
export async function submitMessage(name: string, content: string) {
  try {
    await prisma.message.create({
      data: {
        name,
        content,
        isApproved: false, // Pending by default
      },
    });
    // Don't revalidate '/' yet because it's pending anyway
    return { success: true };
  } catch (error) {
    console.error("Failed to submit message", error);
    return { success: false, error: "Failed to submit message" };
  }
}

// Get approved messages for the public UI
export async function getApprovedMessages() {
  try {
    const messages = await prisma.message.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
    });
    return messages;
  } catch (error) {
    console.error("Failed to fetch messages", error);
    return [];
  }
}

// Get ALL messages for the admin panel
export async function getAllMessages() {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) throw new Error("Unauthorized");

  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return messages;
  } catch (error) {
    console.error("Failed to fetch all messages", error);
    return [];
  }
}

// Approve a message
export async function approveMessage(id: string) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) throw new Error("Unauthorized");

  try {
    await prisma.message.update({
      where: { id },
      data: { isApproved: true },
    });
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error("Failed to approve message", error);
    return { success: false, error: "Failed to approve message" };
  }
}

// Delete a message
export async function deleteMessage(id: string) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) throw new Error("Unauthorized");

  try {
    await prisma.message.delete({
      where: { id },
    });
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error("Failed to delete message", error);
    return { success: false, error: "Failed to delete message" };
  }
}
