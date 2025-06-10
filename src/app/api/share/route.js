import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "@clerk/nextjs/server";
import Share from "@/app/models/share";
import Resume from "@/app/models/resume";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const { resumeId, expiresAt, password } = await req.json();
    console.log("Received data:", { resumeId, expiresAt, password });

    // Check if resume exists
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return NextResponse.json(
        { error: "Resume not found", success: false },
        { status: 404 }
      );
    }

    // Check if a share already exists for this resumeId and is not expired
    const existingShare = await Share.findOne({ resumeId });

    const now = new Date();
    if (
      existingShare &&
      (!existingShare.expiresAt || now <= existingShare.expiresAt)
    ) {
      return NextResponse.json(
        {
          success: true,
          shareId: existingShare.shareId,
          expiresAt: existingShare.expiresAt,
        },
        { status: 200 }
      );
    }

    // Create new share
    const shareId = uuidv4();

    const sharedLink = await Share.create({
      resumeId,
      shareId,
      password,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      userId,
    });

    return NextResponse.json(
      {
        success: true,
        shareId: sharedLink.shareId,
        expiresAt: sharedLink.expiresAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating shareable link:", error);
    return NextResponse.json(
      { error: "Failed to create shareable link", success: false },
      { status: 500 }
    );
  }
}
