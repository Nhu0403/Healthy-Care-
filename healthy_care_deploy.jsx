import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Switch } from "./components/ui/switch";
import { Input } from "./components/ui/input";
import { useEffect, useState } from "react";
import { Bell, HeartPulse, Pill, CalendarCheck, Droplet, FileText, Phone, Volume2 } from "lucide-react";

export default function HealthyCareApp() {
  const [remindersOn, setRemindersOn] = useState(true);
  const [callTriggered, setCallTriggered] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bloodSugarHistory, setBloodSugarHistory] = useState([
    { date: "12/07/2025", value: "6.3 mmol/L" },
    { date: "10/07/2025", value: "7.1 mmol/L" },
    { date: "08/07/2025", value: "6.8 mmol/L" },
  ]);
  const [simpleMode, setSimpleMode] = useState(true);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    speak("Chào mừng bạn đến với ứng dụng Healthy Care");

    const reportInterval = setInterval(() => {
      if (phoneNumber) {
        console.log(`📤 Đã gửi báo cáo sức khỏe định kì đến: ${phoneNumber}`);
        speak("Đã gửi báo cáo sức khỏe đến người thân");
      }
    }, 10000);

    return () => clearInterval(reportInterval);
  }, [phoneNumber]);

  const handleMedicineReminderToggle = () => {
    setRemindersOn((prev) => {
      if (!prev) {
        alert("Hệ thống sẽ tự động gọi điện nhắc uống thuốc.");
        setCallTriggered(true);
        speak("Đã bật nhắc uống thuốc. Hệ thống sẽ gọi điện khi đến giờ");
      } else {
        speak("Đã tắt nhắc uống thuốc");
      }
      return !prev;
    });
  };

  const handleEmergency = () => {
    if (phoneNumber) {
      alert(`Đã gửi cảnh báo đến số điện thoại người thân: ${phoneNumber}`);
      speak("Đã gửi cảnh báo đến người thân");
    } else {
      alert("Vui lòng nhập số điện thoại người thân trước khi gửi cảnh báo.");
      speak("Vui lòng nhập số điện thoại người thân trước khi gửi cảnh báo");
    }
  };

  const handleCallNow = () => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      alert("Vui lòng nhập số điện thoại người thân để gọi.");
      speak("Vui lòng nhập số điện thoại người thân để gọi");
    }
  };

  if (simpleMode) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 grid gap-6 text-xl text-center">
        <h1 className="text-3xl font-bold">Healthy Care - Chế độ đơn giản</h1>
        <Input
          type="tel"
          placeholder="Nhập số người thân..."
          className="text-lg"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button className="text-xl py-6" onClick={handleMedicineReminderToggle}>
          {remindersOn ? "Tắt nhắc uống thuốc" : "Bật nhắc uống thuốc"}
        </Button>
        <Button className="text-xl py-6" onClick={handleEmergency} variant="destructive">
          Gửi cảnh báo hỗ trợ
        </Button>
        <Button className="text-xl py-6" onClick={handleCallNow} variant="default">
          📞 Gọi ngay cho người thân
        </Button>
        <Button className="text-xl" onClick={() => setSimpleMode(false)}>Chuyển sang chế độ đầy đủ</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 grid gap-4 text-lg">
      <h1 className="text-2xl font-bold text-center">Healthy Care</h1>

      <Card className="bg-white shadow-xl rounded-2xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 mb-2">
            <Phone className="text-blue-600 w-6 h-6" />
            <span>Thiết lập số điện thoại người thân</span>
          </div>
          <Input
            type="tel"
            placeholder="Nhập số điện thoại..."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card className="bg-white shadow-xl rounded-2xl">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <HeartPulse className="text-red-500 w-8 h-8" />
            <span>Theo dõi nhịp tim & huyết áp</span>
          </div>
          <Button variant="outline">Xem</Button>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-xl rounded-2xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 mb-2">
            <Droplet className="text-pink-500 w-8 h-8" />
            <span>Theo dõi đường huyết</span>
          </div>
          <ul className="list-disc ml-8">
            {bloodSugarHistory.map((entry, index) => (
              <li key={index}>{entry.date}: {entry.value}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-xl rounded-2xl">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Pill className="text-green-500 w-8 h-8" />
            <span>Nhắc uống thuốc (tự động gọi)</span>
          </div>
          <Switch checked={remindersOn} onCheckedChange={handleMedicineReminderToggle} />
        </CardContent>
      </Card>

      <Card className="bg-white shadow-xl rounded-2xl">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CalendarCheck className="text-blue-500 w-8 h-8" />
            <span>Lịch khám bệnh</span>
          </div>
          <Button variant="outline">Xem</Button>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-xl rounded-2xl">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FileText className="text-purple-500 w-8 h-8" />
            <span>Lưu thông tin chăm sóc sức khỏe</span>
          </div>
          <Button variant="outline">Xem</Button>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-xl rounded-2xl">
        <CardContent className="p-4 flex flex-col gap-4 items-start">
          <div className="flex items-center gap-4">
            <Bell className="text-yellow-500 w-8 h-8" />
            <span className="text-lg">Cảnh báo bất thường</span>
          </div>
          <div className="flex gap-4">
            <Button variant="destructive" onClick={handleEmergency}>Gọi hỗ trợ</Button>
            <Button onClick={handleCallNow}>📞 Gọi ngay</Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={() => setSimpleMode(true)} className="mt-4 text-sm" variant="outline">Chuyển sang chế độ đơn giản</Button>
      </div>
    </div>
  );
}
