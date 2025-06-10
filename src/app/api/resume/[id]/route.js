import Resume from "@/app/models/resume";
import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import Share from "@/app/models/share";

export async function GET(req, { params }) {
  await connectToDatabase();
  const { id } = await params;

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    const resume = await Resume.findById(id);
    if (!resume) {
      return Response.json(
        { message: "Resume not found", success: false },
        { status: 404 }
      );
    }
    return Response.json({ resume, success: true }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: "Failed to fetch resume", error: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await connectToDatabase();
  const { id } = await params;
  const data = await req.json();

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    const updatedResume = await Resume.findByIdAndUpdate(id, data, {
      new: true,
    });
    return Response.json(
      { resume: updatedResume, success: true },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Failed to update resume", error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const resumeId = params.id;

    // Delete the resume
    const deletedResume = await Resume.findOneAndDelete({
      _id: resumeId,
      userId,
    });

    if (!deletedResume) {
      return NextResponse.json(
        { error: "Resume not found", success: false },
        { status: 404 }
      );
    }

    // Also delete associated Share (if any)
    await Share.deleteOne({ resumeId });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete resume", success: false },
      { status: 500 }
    );
  }
}
