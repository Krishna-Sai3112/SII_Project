import React, { useState } from 'react';
import { FaUsers, FaClipboardCheck, FaChartBar } from 'react-icons/fa';
import StudentManagement from './components/StudentManagement';
import AttendanceMarking from './components/AttendanceMarking';
import MonthlySummary from './components/MonthlySummary';

function App() {
  const [activeTab, setActiveTab] = useState('students');

  const tabs = [
    { id: 'students', name: 'Student Management', icon: FaUsers },
    { id: 'attendance', name: 'Mark Attendance', icon: FaClipboardCheck },
    { id: 'summary', name: 'Monthly Summary', icon: FaChartBar },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-primary-700 flex items-center gap-3">
            <FaClipboardCheck className="text-4xl" />
            Student Attendance Manager
          </h1>
          <p className="text-gray-600 mt-1">Manage students, mark attendance, and generate reports</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-4 font-medium text-sm transition-all
                    ${activeTab === tab.id
                      ? 'text-primary-700 border-b-2 border-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="text-lg" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'students' && <StudentManagement />}
        {activeTab === 'attendance' && <AttendanceMarking />}
        {activeTab === 'summary' && <MonthlySummary />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            © 2025 Student Attendance Manager. Built with React, Node.js & MongoDB.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

