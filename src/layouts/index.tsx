import React, { useState } from 'react';
import { Layout } from 'antd';
import {
  FontSizeOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  EnvironmentOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import Thumbnail from '../components/Thumbnail/index';
import Scaler from '../components/Scaler/index';
import Ruler from '../components/Ruler/index';

import Grid from '../renderers/Grid/index';

import './index.css';

const { Header, Content, Sider } = Layout;

export default function EditorPage() {
  const [collapsed, setCollapsed] = useState(false);

  // resize the viewport
  const initalScale = 100;
  const [scale, setScale] = useState(initalScale);
  const onZoomUp = () => setScale(scale + 10);
  const onZoomDown = () => scale > 10 && setScale(scale - 10);
  const onReset = () => setScale(initalScale);
  const onWheel = (event: any) => {
    if (!event.ctrlKey) return;
    event.deltaY > 0 ? onZoomDown() : onZoomUp();
  };

  // collapse siderMenu
  const onCollapse = () => setCollapsed(!collapsed);

  // source panel visible
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [datasVisible, setDatasVisible] = useState(false);

  const [width, setWidth] = useState(1366);
  const [height, setHeight] = useState(768);

  const onResize = (
    event: React.SyntheticEvent,
    { size }: ResizeCallbackData,
  ) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  return (
    <Layout className="h-screen">
      <Sider collapsible trigger={null} collapsed={collapsed} width={200}>
        <Header className="text-center" style={{ padding: '0 24px' }}>
          {!collapsed ? (
            <h2
              className="cursor-pointer"
              onClick={() => (window.location.href = '/')}
            >
              Digital Go
            </h2>
          ) : (
            <h2>☄️ </h2>
          )}
        </Header>
        <div className="w-full flex">
          <div className="w-full text-xl text-center">
            <div className="p-2 cursor-pointer hover:text-blue-500">
              <MenuFoldOutlined onClick={onCollapse} />
            </div>
            <div className="p-2 cursor-pointer hover:text-blue-500">
              <BarChartOutlined />
            </div>
            <div className="p-2 cursor-pointer hover:text-blue-500">
              <EnvironmentOutlined />
            </div>
            <div className="p-2 cursor-pointer hover:text-blue-500">
              <FontSizeOutlined />
            </div>
            <div className="p-2 cursor-pointer hover:text-blue-500">
              <AppstoreOutlined />
            </div>
          </div>
          {!collapsed && (
            <div
              className="overflow-auto bg-gray-400 bg-opacity-5"
              style={{ height: window.innerHeight - 64 }}
            >
              <Thumbnail />
            </div>
          )}
        </div>
      </Sider>

      <Layout>
        <Header className="flex justify-between items-center">
          <div className="flex justify-between w-24 text-lg">
            {/* <TemplateRepo /> 模板库*/}
          </div>
          <div className="flex h-full justify-center items-center">
            {/* <MultiDevicePreview /> 多端预览 */}
          </div>
          <div className="flex justify-between w-48 text-lg">
            {/* BaseToolsBar 基本工具栏 */}
          </div>
        </Header>
        <Content className="relative overflow-hidden">
          {/* <Ruler /> 标尺系统 */}
          {/* <Canvas /> 画布区 */}
          {/* <Scaler /> 缩放键盘小工具 */}
          {/* <OpitionsConfig /> 基础配置 */}
          {/* <DataConfig /> 数据源配置 */}
        </Content>
      </Layout>
    </Layout>
  );
}
