import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, ArrowRightLeft, DollarSign, Activity } from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminDashboard() {
  const t = useTranslations();
  
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users"],
  });

  const { data: transfers, isLoading: transfersLoading } = useQuery({
    queryKey: ["/api/admin/transfers"],
  });

  const isLoading = statsLoading || usersLoading || transfersLoading;

  const pendingUsers = Array.isArray(users) ? users.filter((u: any) => u.status === 'pending').length : 0;
  const totalVolume = Array.isArray(transfers) ? transfers.reduce((sum: number, t: any) => sum + parseFloat(t.amount), 0) : 0;

  return (
    <AdminLayout title={t.admin.dashboard.title}>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200">
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <Card className="bg-white rounded-2xl shadow-sm border border-gray-200" data-testid="card-total-users">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-700">{t.admin.dashboard.totalUsers}</CardTitle>
                  <Users className="w-8 h-8 text-indigo-600" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-indigo-600 mt-2" data-testid="text-total-users">
                  {(stats as any)?.totalUsers || 0}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {(stats as any)?.activeUsers || 0} {t.admin.dashboard.activeUsers}, {pendingUsers} {t.admin.dashboard.pendingUsers}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-sm border border-gray-200" data-testid="card-total-transfers">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-700">{t.admin.dashboard.transfers}</CardTitle>
                  <ArrowRightLeft className="w-8 h-8 text-indigo-600" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-indigo-600 mt-2" data-testid="text-total-transfers">
                  {(stats as any)?.totalTransfers || 0}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {(stats as any)?.pendingTransfers || 0} {t.admin.dashboard.transfersPending}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-sm border border-gray-200" data-testid="card-total-loans">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-700">{t.admin.dashboard.loans}</CardTitle>
                  <DollarSign className="w-8 h-8 text-indigo-600" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-indigo-600 mt-2" data-testid="text-total-loans">
                  {(stats as any)?.totalLoans || 0}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {(stats as any)?.activeLoans || 0} {t.admin.dashboard.loansActive}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-sm border border-gray-200" data-testid="card-total-volume">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-700">{t.admin.dashboard.totalVolume}</CardTitle>
                  <Activity className="w-8 h-8 text-indigo-600" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-indigo-600 mt-2" data-testid="text-total-volume">
                  {totalVolume.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </p>
                <p className="text-sm text-gray-500 mt-1">{t.admin.dashboard.volumeDescription}</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white rounded-2xl shadow-sm border border-gray-200" data-testid="card-recent-users">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">{t.admin.dashboard.recentUsers}</CardTitle>
            <CardDescription className="text-sm text-gray-500">{t.admin.dashboard.recentUsersDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.isArray(users) && users.slice(0, 5).map((user: any) => (
                <div key={user.id} className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors" data-testid={`row-user-${user.id}`}>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-gray-900" data-testid={`text-user-name-${user.id}`}>{user.fullName}</p>
                    <p className="text-sm text-gray-500 truncate" data-testid={`text-user-email-${user.id}`}>{user.email}</p>
                  </div>
                  <Badge
                    variant={user.status === 'active' ? 'default' : 'secondary'}
                    data-testid={`badge-user-status-${user.id}`}
                  >
                    {user.status === 'active' ? t.admin.common.status.active : t.admin.common.status.pending}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-2xl shadow-sm border border-gray-200" data-testid="card-recent-transfers">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">{t.admin.dashboard.recentTransfers}</CardTitle>
            <CardDescription className="text-sm text-gray-500">{t.admin.dashboard.recentTransfersDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.isArray(transfers) && transfers.slice(0, 5).map((transfer: any) => (
                <div key={transfer.id} className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors" data-testid={`row-transfer-${transfer.id}`}>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-gray-900" data-testid={`text-transfer-recipient-${transfer.id}`}>{transfer.recipient}</p>
                    <p className="text-sm text-gray-500 truncate" data-testid={`text-transfer-user-${transfer.id}`}>{transfer.userName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium mb-1 text-gray-900" data-testid={`text-transfer-amount-${transfer.id}`}>
                      {parseFloat(transfer.amount).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </p>
                    <Badge
                      variant={
                        transfer.status === 'completed' ? 'default' : 
                        transfer.status === 'in-progress' ? 'secondary' :
                        transfer.status === 'suspended' ? 'destructive' :
                        'outline'
                      }
                      data-testid={`badge-transfer-status-${transfer.id}`}
                    >
                      {transfer.status === 'completed' ? t.admin.common.status.completed : 
                       transfer.status === 'in-progress' ? t.admin.common.status.inProgress :
                       transfer.status === 'suspended' ? t.admin.common.status.suspended :
                       t.admin.common.status.pending}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
