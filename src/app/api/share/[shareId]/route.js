import { connectToDatabase } from "@/lib/db";
import Share from "@/app/models/share";
import Resume from "@/app/models/resume";
import { NextResponse } from "next/server";

// App Router uses `params` to extract dynamic route parameters
export async function POST(req, { params }) {
  try {
    const { shareId } = params;
    const { password } = await req.json();

    await connectToDatabase();

    const share = await Share.findOne({ shareId });

    if (!share) {
      return NextResponse.json(
        { error: "Not found", success: false },
        { status: 404 }
      );
    }

    if (share.expiresAt && new Date() > share.expiresAt) {
      return NextResponse.json(
        { error: "Link expired", success: false },
        { status: 410 }
      );
    }

    // Password check
    if (share.password && share.password !== password) {
      return NextResponse.json(
        { error: "Invalid password", success: false },
        { status: 401 }
      );
    }

    const resume = await Resume.findById(share.resumeId);
    if (!resume) {
      return NextResponse.json(
        { error: "Resume not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, resume }, { status: 200 });
  } catch (error) {
    console.error("Error fetching shared resume:", error);
    return NextResponse.json(
      { error: "Failed to fetch shared resume", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    const { shareId } = params;

    await connectToDatabase();

    const share = await Share.findOne({ resumeId: shareId });
    if (!share) {
      return NextResponse.json(
        { error: "Not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, share }, { status: 200 });
  } catch (error) {
    console.error("Error fetching shared resume:", error);
    return NextResponse.json(
      { error: "Failed to fetch shared resume", success: false },
      { status: 500 }
    );
  }
}
