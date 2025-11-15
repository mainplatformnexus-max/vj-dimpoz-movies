"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import AdminNav from "@/components/admin-nav"
import { Card } from "@/components/ui/card"
import { database } from "@/lib/firebase"
import { SUBSCRIPTION_PLANS } from "@/lib/subscription-context"
import { intervalToDuration } from "date-fns"
import { ref as dbRef, get } from "firebase/database"
import { Users, Calendar, Mail, CheckCircle, XCircle } from "lucide-react"

interface Subscription {
  plan?: string
  expiresAt?: string | null
  isActive?: boolean
}

interface User {
  id: string
  email: string
  displayName?: string
  photoURL?: string
  createdAt: string
  lastLogin?: string
  subscription?: Subscription
}

export default function UsersManagement() {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [usersLoading, setUsersLoading] = useState(true)

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/login")
    }
  }, [user, loading, isAdmin, router])

  useEffect(() => {
    if (isAdmin) {
      loadUsers()
    }
  }, [isAdmin])

  const loadUsers = async () => {
    try {
      const [usersSnap, subscriptionsSnap] = await Promise.all([
        get(dbRef(database, "users")),
        get(dbRef(database, "subscriptions")),
      ])

      if (usersSnap.exists()) {
        const usersData = usersSnap.val()
        const subscriptionsData = subscriptionsSnap.exists() ? subscriptionsSnap.val() : {}

        const usersList = Object.entries(usersData).map(([id, value]: any) => {
          const userSubscription = subscriptionsData[id]

          // Normalize subscription data coming from the DB. Older/newer code
          // uses different field names like `planId`/`endDate`/`active`.
          const normalizedSubscription = userSubscription
            ? {
                plan:
                  // Prefer a human-friendly name from SUBSCRIPTION_PLANS
                  SUBSCRIPTION_PLANS.find((p) => p.id === userSubscription.planId)?.name ||
                  userSubscription.plan ||
                  userSubscription.planId ||
                  "Unknown",
                expiresAt: userSubscription.endDate || userSubscription.expiresAt || null,
                isActive:
                  typeof userSubscription.active === "boolean"
                    ? userSubscription.active
                    : userSubscription.endDate
                    ? new Date(userSubscription.endDate) > new Date()
                    : false,
              }
            : undefined

          return {
            id,
            email: value.email || "N/A",
            displayName: value.displayName || "User",
            photoURL: value.photoURL,
            createdAt: value.createdAt || new Date().toISOString(),
            lastLogin: value.lastLogin,
            subscription: normalizedSubscription,
          }
        })

        // Sort by last login (most recent first)
        usersList.sort((a, b) => {
          const dateA = new Date(a.lastLogin || a.createdAt).getTime()
          const dateB = new Date(b.lastLogin || b.createdAt).getTime()
          return dateB - dateA
        })

        setUsers(usersList)
        console.log("[v0] Loaded users with subscriptions:", usersList)
      }
      setUsersLoading(false)
    } catch (error) {
      console.error("Error loading users:", error)
      setUsersLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <AdminNav />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Manage Users</h1>
          <p className="text-white/70">Total Users: {users.length}</p>
        </div>

        {usersLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-white text-lg">Loading users...</div>
          </div>
        ) : users.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 p-8">
            <div className="text-center">
              <Users className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <p className="text-white/70 text-lg">No users registered yet</p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {users.map((userItem) => (
              <Card
                key={userItem.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-6 hover:border-white/40 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      {userItem.photoURL && (
                        <img
                          src={userItem.photoURL || "/placeholder.svg"}
                          alt={userItem.displayName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-white">{userItem.displayName}</h3>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <Mail className="w-4 h-4" />
                          {userItem.email}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-white/60 text-xs uppercase tracking-wider">Created</p>
                        <p className="text-white flex items-center gap-2 text-sm mt-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(userItem.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/60 text-xs uppercase tracking-wider">Last Login</p>
                        <p className="text-white flex items-center gap-2 text-sm mt-1">
                          <Calendar className="w-4 h-4" />
                          {userItem.lastLogin ? new Date(userItem.lastLogin).toLocaleDateString() : "Never"}
                        </p>
                      </div>
                    </div>

                    {userItem.subscription && (
                      <div className="mt-4 p-3 bg-white/5 rounded border border-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white/60 text-xs uppercase tracking-wider">Subscription</p>
                            <p className="text-white font-medium mt-1">{userItem.subscription.plan}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white/60 text-xs uppercase tracking-wider">Expires</p>
                            <p className="text-white text-sm mt-1">
                                {userItem.subscription.expiresAt ? (
                                  (() => {
                                    try {
                                      const expires = new Date(userItem.subscription.expiresAt as string)
                                      const now = new Date()
                                      if (isNaN(expires.getTime())) return "N/A"

                                      if (expires > now) {
                                        const dur = intervalToDuration({ start: now, end: expires })
                                        const days = dur.days || 0
                                        const hours = dur.hours || 0
                                        const minutes = dur.minutes || 0
                                        if (days > 0) return `${days}d ${hours}h left`
                                        if (hours > 0) return `${hours}h ${minutes}m left`
                                        return `${minutes}m left`
                                      } else {
                                        const dur = intervalToDuration({ start: expires, end: now })
                                        const days = dur.days || 0
                                        const hours = dur.hours || 0
                                        if (days > 0) return `Expired ${days}d ${hours}h ago`
                                        if (hours > 0) return `Expired ${hours}h ago`
                                        return `Expired`
                                      }
                                    } catch (e) {
                                      return "N/A"
                                    }
                                  })()
                                ) : (
                                  "N/A"
                                )}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-right ml-4">
                    {userItem.subscription?.isActive ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-400/50 rounded text-green-100 text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Subscribed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 border border-red-400/50 rounded text-red-100 text-xs font-medium">
                        <XCircle className="w-3 h-3" />
                        No Subscription
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
