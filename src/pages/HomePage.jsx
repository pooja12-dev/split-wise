import WelcomeBanner from "../components/WelcomeBanner";
import BalanceCards from "../components/BalanceCards";
import ExpenseTrendsChart from "../components/ExpenseTrendsChart";
import RemindersOverview from "../components/Reminder";
import Notifications from "../components/Notifications";

export default function Home() {
  return (
    <div>
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Balance Cards Section */}
      <BalanceCards />

      {/* Expense Trends Section */}
      <ExpenseTrendsChart />

      {/* Notifications and Reminders Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Notifications />
        <RemindersOverview />
      </div>
    </div>
  );
}
