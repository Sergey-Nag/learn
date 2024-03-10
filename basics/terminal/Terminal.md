### Шпаргалка по использованию терминала Windows

#### Открытие терминала
- **`Win + R`**, затем введите `cmd` и нажмите Enter – открывает командную строку.
- **`Win + X`**, затем выберите "Windows PowerShell" – открывает PowerShell, более мощную оболочку, чем cmd.

#### Основные команды
- **`dir`** (в cmd) или **`ls`** (в PowerShell) – выводит список файлов и папок в текущей директории.
- **`cd <путь>`** – меняет текущую директорию на указанную.
  - `cd ..` – перемещает на уровень выше.
- **`mkdir <имя_папки>`** – создает новую папку.
- **`rmdir <имя_папки>`** (в cmd) или **`Remove-Item <имя_папки> -Recurse`** (в PowerShell) – удаляет папку и все ее содержимое.
- **`del <имя_файла>`** (в cmd) или **`Remove-Item <имя_файла>`** (в PowerShell) – удаляет файл.
- **`copy <откуда> <куда>`** (в cmd) или **`Copy-Item <откуда> <куда>`** (в PowerShell) – копирует файлы или папки.
- **`move <откуда> <куда>`** – перемещает файлы или папки.
- **`rename <старое_имя> <новое_имя>`** (в cmd) или **`Rename-Item <старое_имя> <новое_имя>`** (в PowerShell) – переименовывает файлы или папки.
- **`cls`** (в cmd) или **`clear`** (в PowerShell) – очищает окно терминала от предыдущих команд и их вывода.
- **`exit`** – закрывает терминал.

#### Работа с сетью
- **`ping <адрес>`** – проверяет доступность сетевого узла.
- **`ipconfig`** (в cmd) или **`Get-NetIPConfiguration`** (в PowerShell) – выводит конфигурацию сетевых адаптеров.

#### Управление процессами
- **`tasklist`** (в cmd) или **`Get-Process`** (в PowerShell) – показывает список запущенных процессов.
- **`taskkill /IM <имя_процесса>`** (в cmd) или **`Stop-Process -Name <имя_процесса>`** (в PowerShell) – завершает указанный процесс.