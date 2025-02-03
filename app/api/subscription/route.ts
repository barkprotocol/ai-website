import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mock-db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface SubscriptionRequest {
  action: "subscribe" | "unsubscribe";
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as SubscriptionRequest;
    if (!body.action || !["subscribe", "unsubscribe"].includes(body.action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (body.action === "subscribe") {
      const subscription = await mockDb.subscription.create({
        data: {
          userId: session.user.id,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          active: true,
        },
      });

      return NextResponse.json({ success: true, subscription });
    }

    if (body.action === "unsubscribe") {
      const subscription = await mockDb.subscription.updateMany({
        where: {
          userId: session.user.id,
          active: true,
        },
        data: {
          active: false,
          endDate: new Date(),
        },
      });

      return NextResponse.json({ success: true, subscription });
    }
  } catch (error) {
    console.error("Error processing subscription request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const subscription = await mockDb.subscription.findFirst({
      where: {
        userId: session.user.id,
        active: true,
      },
    });

    return NextResponse.json({ subscription });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
