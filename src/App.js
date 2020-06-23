import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Layout, Typography, Input, Space, Form, Spin } from 'antd';
import { SecurityScanOutlined } from '@ant-design/icons';
import Map from './components/Map';

import './App.css';

const API = 'http://get.geojs.io/v1';

function App() {
  const [result, setResult] = useState();
  const [error, setError] = useState();
  // Quite ugly but cannot find another way to calculate height of this element without changing layout. Thanks to Ant Design
  const formContainer = useRef();

  const onSearch = useCallback((value) => {
    const addr = value ? `geo/${value}.json` : 'geo.json';
    fetch(`${API}/ip/${addr}`)
      .then((r) => r.json())
      .then((r) =>
        r.latitude !== 'nil' ? setResult(r) : setError('No info about that IP')
      )
      .catch((e) => setError('Invalid ip!'));
  }, []);

  useEffect(() => {
    fetch(`${API}/ip/geo.json`)
      .then((r) => r.json())
      .then((r) => result ?? setResult(r));
  }, [result]);

  return (
    <Layout className="max-height">
      <Layout.Header className="app__header">
        <Space>
          <SecurityScanOutlined />
          <Typography.Text style={{ color: 'white' }}>
            IP searcher
          </Typography.Text>
        </Space>
      </Layout.Header>
      <Layout.Content className="max-height">
        <div className="form-container" ref={formContainer}>
          <Form className="content__form">
            <Form.Item validateStatus={!!error ? 'error' : false} help={error}>
              <Input.Search
                className="searchInput"
                placeholder="Enter IP address"
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                onChange={useCallback(() => setError(), [])}
              />
            </Form.Item>
          </Form>
        </div>
        {result ? (
          <Map
            data={result}
            height={
              formContainer.current
                ? `calc(100% - ${formContainer.current.offsetHeight}px)`
                : undefined
            }
          />
        ) : (
          <Spin size="large" className="spinner" />
        )}
      </Layout.Content>
    </Layout>
  );
}

export default App;
