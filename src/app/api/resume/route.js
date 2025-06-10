import { connectToDatabase } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import Resume from "@/app/models/resume";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return NextResponse.json(
        { error: "Unauthorized", success: false },
        { status: 401 }
      );

    await connectToDatabase();

    const data = await req.json();
    console.log("Received data:", data); // ✅ Inspect full shape

    // Now build the resume from `body` directly
    const resume = await Resume.create({
      userId,
      ...data,
    });

    return NextResponse.json({ success: true, resume }, { status: 200 });
  } catch (error) {
    console.error("Resume creation error:", error);
    return NextResponse.json(
      { error: "Failed to create resume", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Fetch resumes only for the authenticated user
    const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });

    return NextResponse.json({ success: true, resumes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json(
      { error: "Failed to fetch resumes", success: false },
      { status: 500 }
    );
  }
}
