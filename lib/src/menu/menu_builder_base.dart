
import 'package:system_tray/system_tray.dart';

abstract class MenuBuilderBase {
  MenuBuilderBase();

  MenuItem showMainWindow();
  MenuItem hideMainWindow();
}