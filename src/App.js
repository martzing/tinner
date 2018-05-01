import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Layout } from 'antd';
import ProfileCard from './components/ProfileCard';
import FilterPanel from './components/FilrerPanel';
const { Sider, Content } = Layout;

class App extends Component {
  state = { selectedDistance: 5, selectedAge: [18, 25] }

  onAgeChange = (age) => {
    this.setState(() => ({selectedAge: age}))
  }

  onDistanceChange = (distance) => {
    this.setState(() => ({selectedDistance: distance}))    
  }
  render() {
    return (
      <Layout>
        <Layout>
          <Sider width={300} style={{ background: '#fff' }}>
            <FilterPanel onFilterChange={this.onDistanceChange} name={'distance'} defualt={this.state.selectedDistance} min={0} max={20}/>
            <FilterPanel isRange onFilterChange={this.onAgeChange} name={'age rage'} defualt={this.state.selectedAge} min={12} max={60}/>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
      
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: '100vh' }}>
              <ProfileCard selectedAge={[...this.state.selectedAge]} selectedDistance={this.state.selectedDistance}/>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default App